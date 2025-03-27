import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "./_components/ThemeContext";
import ThemeToggle from "./_components/ThemeToggle";
import MusicPlayer from "./_components/MusicPlayer";
import Navigation from "./_components/Navigation";

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
      <body className={`${inter.variable} antialiased bg-[var(--background)] text-[var(--text-primary)] transition-all duration-300`} suppressHydrationWarning>
        <ThemeProvider>
          <div className="fixed top-4 right-4 z-50 flex gap-4 items-center">
            <ThemeToggle />
          </div>
          <MusicPlayer />
          <div className="min-h-screen backdrop-blur-sm bg-gradient-to-br from-purple-50/30 to-pink-50/30 dark:from-purple-900/30 dark:to-pink-900/30">
            <Navigation />
            {children}
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
