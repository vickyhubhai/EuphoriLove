import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata = {
  title: "Euphori-Love",
  description: "EuphoriLove – Created by Vicky, this heartfelt space celebrates love in all forms—romantic, self-love, and connections. Spread joy, embrace positivity, and cherish every moment! 💖✨",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${inter.variable} antialiased`} suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
