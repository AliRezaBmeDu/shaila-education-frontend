import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

import { ThemeProvider } from "../components/ThemeProvider";
import Navbar from "../components/Navbar";
import AuthProvider from "../components/AuthProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Shaila Akhter Education",
  description: "Learn with Shaila",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} bg-white text-gray-900 dark:bg-gray-900 dark:text-gray-200`}>
        <AuthProvider>
          <ThemeProvider>
            
            {/* --- 1. GLOBAL FIXED WATERMARK BACKGROUND --- */}
            <div className="fixed inset-0 -z-50 pointer-events-none transition-colors duration-300">
              <div className="absolute inset-0 
                              bg-no-repeat bg-center 
                              // --- UPDATED: CUSTOM BACKGROUND SIZE ---
                              // You can adjust '70%' to '60%', '50%', etc., to make it larger or smaller.
                              bg-[length:40%_auto] 
                              opacity-10 dark:opacity-5 
                              bg-[url('/logo.png')] 
                              dark:bg-[url('/logo-white.png')]">
              </div>
            </div>
            {/* ---------------------------------------------- */}

            <div className="min-h-screen flex flex-col relative z-0">
              <Navbar />
              <main className="flex-grow">
                {children}
              </main>
            </div>

          </ThemeProvider>
        </AuthProvider>
      </body>
    </html>
  );
}