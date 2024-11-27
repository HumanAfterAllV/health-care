import type { Metadata } from "next";
import { Inter as FontSans } from "next/font/google";
import { cn } from "../lib/utils";
import "./globals.css";
/* import { ThemeProvider } from "@/components/theme-provider";
 */
const fontSans = FontSans({
  subsets: ["latin"],
  display: "swap",
  weight: [ '300','400', '500', '600', '700'],
  variable: '--font-sans',
})

export const metadata: Metadata = {
  title: "NextCare",
  description: "A health care management system",
  icons: {
    icon: '/assets/icons/logo-icon.svg',
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={cn('min-h-screen font-sans antialiased', fontSans.variable)}>
{/*         <ThemeProvider
          attribute='class'
          defaultTheme='dark'
        /> */}
        {children}
      </body>
    </html>
  );
}
