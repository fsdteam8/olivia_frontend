/* eslint-disable @typescript-eslint/no-explicit-any */

export interface SurveyPayload {
  name: string;
  email: string;
  city: string;
  country: string;
  link: string;
  climateJourney: string;
  message: string;
  interest: string[];
  goals: string[];
  successMessage: string;
  whatLooking: string[];
  engagementPreference: string;
  opportunity: string;
  hubs: string;
  region: string;
  impactNewsletter: boolean;
  localNotification: boolean;
  updateFrequency: string;
  tellAbout: string;
}

export interface SurveyResponse {
  success: boolean;
  message: string;
  data?: any;
}

const BASE_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

export const createSurvey = async (
  payload: SurveyPayload,
  token: string,
): Promise<SurveyResponse> => {
  const response = await fetch(`${BASE_URL}/survey/create`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(
      errorData?.message || `Request failed with status ${response.status}`,
    );
  }

  return response.json();
};
