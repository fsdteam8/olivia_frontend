// src/providers/MainProviders.tsx
"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactNode, useState } from "react";

export default function MainProviders({ children }: { children: ReactNode }) {
  // useState ensures QueryClient is instantiated once and not recreated on re-renders
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 1000 * 60, // Data remains fresh for 1 minute before background re-fetch
            gcTime: 1000 * 60 * 10, // Unused query cache is kept for 10 minutes
            refetchOnWindowFocus: false, // Stop redundant refetches every time user switches browser tabs
            retry: 1, // Only retry once on network error instead of 3 times
          },
        },
      }),
  );

  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}
