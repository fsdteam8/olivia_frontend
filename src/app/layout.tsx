import type { Metadata } from "next";
import { Inter, Lilita_One, Archivo_Black } from "next/font/google";
import "./globals.css";
import MainProviders from "@/Providers/MainProviders";
import Provider from "@/Providers/Provider";
import { Toaster } from "sonner";
import { Navbar } from "@/components/home/Navbar";
import TopLoader from "nextjs-toploader";
import Footer from "@/components/home/Footer";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const lilita = Lilita_One({
  subsets: ["latin"],
  variable: "--font-lilita",
  weight: "400",
  display: "swap",
});

const archivo = Archivo_Black({
  subsets: ["latin"],
  variable: "--font-archivo",
  weight: "400",
  display: "swap",
});

export const metadata: Metadata = {
  title: "sktch Labs",
  description:
    "Design amazing digital experiences that create more happy in the world.",
  icons: {
    icon: "/logo.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} ${lilita.variable} ${archivo.variable} antialiased`}
      >
        <MainProviders>
          <Provider>
            <Navbar />

            <TopLoader color="#2563eb" easing="ease-in" showSpinner={false} />

            <main className="min-h-[calc(100vh-200px)]">{children}</main>

            <Footer />
          </Provider>
        </MainProviders>

        <Toaster position="top-right" closeButton />
      </body>
    </html>
  );
}
