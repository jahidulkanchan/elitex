import type { Metadata } from "next";
import {Josefin_Sans, Lato } from "next/font/google";
import "./globals.css";
import AuthProvider from "./providers/SessionProvider";

const josefinSans = Josefin_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-josefin-sans",
});
const lato = Lato({
  subsets: ["latin"],
  weight: ["300", "400", "700", "900"],
  variable: "--font-lato",
});


export const metadata: Metadata = {
  title: "Elitex Nature – Premium Bonsai & Aquarium Collections",
  description: "Discover hand-selected premium bonsai trees, rare aquarium fish, and high-end aquatic accessories. Elevate your space with living art and luxury aquatic essentials."
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        cz-shortcut-listen="true"
        data-new-gr-c-s-check-loaded="14.1274.0"
        data-gr-ext-installed=""
        className={`${josefinSans.variable} ${lato.variable} antialiased`}
      >
        {/* <AuthProvider>{children}</AuthProvider> */}
        {children}
      </body>
    </html>
  );
}
