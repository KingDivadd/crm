import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Crm App",
  description: "A web app for crm operations",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className='relative'>
        {children}
      </body>
    </html>
  );
}
