export interface StripeConnectStatus {
  connected: boolean;
  status: "not_connected" | "pending" | "active" | "restricted";
  chargesEnabled: boolean;
  payoutsEnabled: boolean;
  detailsSubmitted: boolean;
  stripeConnectAccountId?: string;
  stripeConnectOnboardedAt?: string;
}

export async function fetchStripeStatus(token?: string): Promise<StripeConnectStatus | null> {
  try {
    const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
    const res = await fetch(`${backendUrl}/education-partner/stripe-connect/status`, {
      headers: {
        "Content-Type": "application/json",
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
      cache: "no-store",
    });

    const data = await res.json();
    if (res.ok && data?.data) {
      return data.data as StripeConnectStatus;
    }
    return null;
  } catch (err) {
    console.error("Failed to fetch Stripe Connect status:", err);
    return null;
  }
}

export async function fetchStripeDashboardLink(token?: string): Promise<string | null> {
  try {
    const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
    const res = await fetch(`${backendUrl}/education-partner/stripe-connect/dashboard-link`, {
      headers: {
        "Content-Type": "application/json",
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
    });

    const data = await res.json();
    if (res.ok && data?.data?.url) {
      return data.data.url as string;
    }
    return null;
  } catch (err) {
    console.error("Failed to get Stripe Express Dashboard link:", err);
    return null;
  }
}
