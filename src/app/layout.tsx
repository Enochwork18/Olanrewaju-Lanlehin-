import type { Metadata } from "next";
import { Bitter, Inter } from "next/font/google";
import { ThemeProvider } from "next-themes";
import "./globals.css";

const bitter = Bitter({
  subsets: ["latin"],
  variable: "--font-serif",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Olanrewaju Lanlehin | Project Manager",
  description:
    "Portfolio of Olanrewaju Lanlehin — Project Manager with over 2 years of experience leading projects and delivering successful events.",
  openGraph: {
    title: "Olanrewaju Lanlehin | Project Manager",
    description:
      "Project Manager with over 2 years of experience leading projects and delivering successful events.",
    type: "website",
    locale: "en_US",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${bitter.variable} ${inter.variable}`} suppressHydrationWarning>
      <body className="font-sans antialiased">
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false}>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
