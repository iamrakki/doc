import "./globals.css";
import { Toaster } from "react-hot-toast";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { GoogleAnalytics, GoogleTagManager } from "@next/third-parties/google";
import {Analytics } from "@vercel/analytics/react";

export const metadata = {
  title: "Certi-Block",
  description: "A blockchain based certificate verification system",
  viewport: "width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        {/* Google Fonts */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin />
        <link href="https://fonts.googleapis.com/css2?family=Italianno&display=swap" rel="stylesheet" />
        <link href="https://fonts.googleapis.com/css2?family=Lily+Script+One&display=swap" rel="stylesheet"></link>
        {/* Include the PDF.js library */}
        <script src="https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.4.120/pdf.min.js" integrity="sha512-ml/QKfG3+Yes6TwOzQb7aCNtJF4PUyha6R3w8pSTo/VJSywl7ZreYvvtUso7fKevpsI+pYVVwnu82YO0q3V6eg==" crossOrigin="anonymous" referrerPolicy="no-referrer"></script>
      </head>
      <body>
        <Toaster position="bottom-center" toastOptions={{ duration: 3000 }} />
        {children}
        <Analytics />
        <SpeedInsights />
      </body>
      {/* Google Tag Manager */}
      <GoogleTagManager gtmId="GTM-KF9C5VCT" />
      {/* Google Analytics 4 */}
      <GoogleAnalytics gaId="G-KDK6101B2R" />
    </html>
  );
}
