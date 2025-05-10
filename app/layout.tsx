import type { Metadata } from "next";
import { Mona_Sans } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";

const monaSans = Mona_Sans({
  variable: "--font-mona-sans",
  subsets: ["latin"],
});


export const metadata: Metadata = {
  title: "PrepWise",
  description: "An AI-powered platform for preparing for mock interviews",
};
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
  
    <html lang="en" className="dark">
    <body 
      className="mona_sans_26ddce03-module__qDlOMW__className antialiased pattern"
      suppressHydrationWarning
      data-gramm="false"
      data-gramm_editor="false"
      data-enable-grammarly="false"
    >
        {children}
        <Toaster/>
      </body>
    </html>
    
  );
}