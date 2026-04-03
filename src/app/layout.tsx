// import bootstrap and Icons
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";

// import AOS
import "aos/dist/aos.css";

import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Header from "../components/Header";

import "./variables.css";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});


export const metadata: Metadata = {
  title: "Trending News App",
  description: "Stay updated with the latest trendy news!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Header />
        {children}
      </body>
    </html>
  );
}
