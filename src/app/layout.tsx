import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
/* import { ThemeProvider } from "@/components/theme-provider";
 */

const generalSansFont = localFont({
  src: [
    {
      path: "./fonts/GeneralSans/GeneralSans-Light.otf",
      weight: "300",
    },
    {
      path: "./fonts/GeneralSans/GeneralSans-Regular.otf",
      weight: "400",
    },
    {
      path: "./fonts/GeneralSans/GeneralSans-Medium.otf",
      weight: "500",
    },
    {
      path:"./fonts/GeneralSans/GeneralSans-Semibold.otf",
      weight: "600",
    },
    {
      path: "./fonts/GeneralSans/GeneralSans-Bold.otf",
      weight: "700",
    }
  ],
  variable: "--font-general-sans",
});

export const metadata: Metadata = {
  title: "Health Solutions",
  description: "A health care solution for everyone.",
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
      <body className={`${generalSansFont.variable}`} suppressHydrationWarning={true}>
{/*         <ThemeProvider
          attribute='class'
          defaultTheme='dark'
        /> */}
        {children}
      </body>
    </html>
  );
}
