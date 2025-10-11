import { Montserrat } from "next/font/google";
import "./globals.css";

export const metadata = {
  title: "German word of the day",
  description: "One german word for only for you",
  charset: "UTF-8",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
      </head>
      <body>
        {children}
      </body>
    </html>
  );
}
