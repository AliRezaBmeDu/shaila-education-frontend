import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

// 1. REMOVE Clerk imports
// import { ClerkProvider } from '@clerk/nextjs';
// import { dark } from '@clerk/themes'; 

import { ThemeProvider } from "../components/ThemeProvider";
import Navbar from "../components/Navbar";

// 2. IMPORT your new AuthProvider
import AuthProvider from "../components/AuthProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "ACE-Ali's Conceptual Education",
  description: "Learn with Ali",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    // 3. REMOVE the <ClerkProvider> wrapper
    // <ClerkProvider ...>
      <html lang="en" suppressHydrationWarning>
        <body className={`${inter.className}`}>
          {/* 4. WRAP with your new AuthProvider */}
          <AuthProvider>
            <ThemeProvider>
              <div className="min-h-screen bg-white text-gray-900 dark:bg-gray-900 dark:text-gray-200">
                <Navbar /> {/* Your Navbar will now be able to access the session */}
                <main>
                  {children}
  .             </main>
              </div>
            </ThemeProvider>
          </AuthProvider>
        </body>
      </html>
    // </ClerkProvider>
  );
}