import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components//ui/theme-provider";
import { Toaster } from "react-hot-toast";
import Navbar from "@/components/ui/Navbar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});


export const metadata: Metadata = {
  title: "SpazaHub Questionnaire",
  description: "Support and growth with the community - SpazaHub questionnaire platform",
  icons: {
    icon: "/favicon.svg",
    apple: "/apple-touch-icon.png",
  },
  openGraph: {
    title: "SpazaHub Questionnaire",
    description: "Support and growth with the community - SpazaHub questionnaire platform",
    url: "https://spazahub-question-app.vercel.app/",
    siteName: "SpazaHub",
    images: [
      {
        url: "https://spazahub-question-app.vercel.app/spazahub-logo.png",
        width: 1200,
        height: 630,
        alt: "SpazaHub Logo",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "SpazaHub Questionnaire",
    description: "Your app description - SpazaHub questionnaire platform",
    images: ["https://spazahub-question-app.vercel.app/spazahub-logo.png"],
  },
};


export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Navbar />
          <main className="pt-16">{children}</main>
          <Toaster position="bottom-center" />
        </ThemeProvider>
      </body>
    </html>
  );
}