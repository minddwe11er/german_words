import { Montserrat } from "next/font/google";
import "./globals.css";
import Script from 'next/script';

export const metadata = {
  title: "German word of the day",
  description: "One german word for only for you",
  charset: "UTF-8",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <Script
          src={`https://www.google.com/recaptcha/api.js?render=${process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY}`}
          strategy="afterInteractive"
          async
          defer
        />
      </head>
      <body>{children}</body>
    </html>
  );
}