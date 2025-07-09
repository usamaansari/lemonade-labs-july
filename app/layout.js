import { Inter } from "next/font/google";
import localFont from 'next/font/local';
import "./globals.css";
import { Toaster } from "react-hot-toast";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

// Load Fredoka One font
const fredoka = localFont({
  src: '../public/fonts/FredokaOne-Regular.ttf',
  variable: '--font-fredoka',
  display: 'swap',
});

export const metadata = {
  title: "Lemonade Labs - Build Your Dream Business!",
  description: "An educational platform where kids learn entrepreneurship by building their own pretend businesses.",
  icons: {
    icon: "/lemon-icon.png",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${inter.variable} ${fredoka.variable}`}>
      <body className="min-h-screen bg-gradient-to-b from-yellow-50 to-amber-50 text-amber-900">
        <Toaster position="top-center" />
        <main className="min-h-screen">
          {children}
        </main>
      </body>
    </html>
  );
}
