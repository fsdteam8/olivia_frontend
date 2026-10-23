import axios from "axios";
import { getSession, signOut } from "next-auth/react";
import type { Session } from "next-auth";

const API_URL =
  process.env.NEXT_PUBLIC_API_URL || process.env.NEXT_PUBLIC_BACKEND_URL;

export const api = axios.create({
  baseURL: API_URL,
  withCredentials: true,
});

// In-memory session cache & promise deduplication to prevent network waterfalls
// (e.g. prevents 5 parallel API calls from making 5 duplicate `/api/auth/session` roundtrips)
let cachedSession: Session | null = null;
let lastSessionFetchTime = 0;
let pendingSessionPromise: Promise<Session | null> | null = null;

async function getCachedSession() {
  const now = Date.now();
  // Return cached session if fetched within the last 5 seconds
  if (cachedSession && now - lastSessionFetchTime < 5000) {
    return cachedSession;
  }

  // Deduplicate concurrent in-flight requests
  if (pendingSessionPromise) {
    return pendingSessionPromise;
  }

  pendingSessionPromise = getSession()
    .then((session) => {
      cachedSession = session;
      lastSessionFetchTime = Date.now();
      return session;
    })
    .finally(() => {
      pendingSessionPromise = null;
    });

  return pendingSessionPromise;
}

// Request interceptor to add the access token to headers
api.interceptors.request.use(
  async (config) => {
    const session = await getCachedSession();
    const accessToken = session?.user?.accessToken;
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

// Response interceptor to handle 401 errors
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // Invalidate cache on 401
    cachedSession = null;
    lastSessionFetchTime = 0;

    // If the error is 401 and we haven't retried yet
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      const session = await getSession();

      // If there's an error in the session (refresh failed), log out
      if (session?.error === "RefreshAccessTokenError") {
        signOut({ callbackUrl: "/login" });
        return Promise.reject(error);
      }

      // If we have a new access token, retry the request
      const accessToken = session?.user?.accessToken;
      if (accessToken) {
        originalRequest.headers.Authorization = `Bearer ${accessToken}`;
        return api(originalRequest);
      }
    }

    return Promise.reject(error);
  },
);
