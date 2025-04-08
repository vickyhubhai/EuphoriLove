import "./globals.css";
import ThemeProvider from "./_components/shared/ThemeProvider";

export const metadata = {
  title: "Euphori-Love",
  description: "EuphoriLove – Created by Vicky, this heartfelt space celebrates love in all forms—romantic, self-love, and connections. Spread joy, embrace positivity, and cherish every moment! 💖✨",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="antialiased" suppressHydrationWarning>
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
