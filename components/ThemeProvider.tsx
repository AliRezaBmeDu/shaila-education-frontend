'use client'

import { ThemeProvider as NextThemesProvider } from 'next-themes'
// --- THIS IS THE FIX ---
import { type ThemeProviderProps } from 'next-themes' // Changed this line

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  return (
    <NextThemesProvider 
      attribute="class" // This links it to Tailwind's darkMode: "class"
      defaultTheme="dark" 
      enableSystem
      {...props} // Pass all other props through
    >
      {children}
    </NextThemesProvider>
  )
}