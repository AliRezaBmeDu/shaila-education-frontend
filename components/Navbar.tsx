'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useSession, signOut } from 'next-auth/react';
import ThemeSwitcher from './ThemeSwitcher';
import { usePathname } from 'next/navigation';

export default function Navbar() {
  const pathname = usePathname();
  const { data: session, status } = useSession();

  return (
    // --- UPDATED HEADER CLASSES ---
    // 1. sticky top-0 z-50: Keeps navbar at the top while scrolling.
    // 2. bg-white/70 & dark:bg-gray-900/70: Sets transparency (70% opacity).
    // 3. backdrop-blur-md: Blurs whatever scrolls behind the navbar.
    // 4. border-b: Adds a subtle line to separate nav from content.
    <header className="sticky top-0 z-50 w-full transition-colors duration-300
                       bg-white/70 dark:bg-gray-900/70 backdrop-blur-md 
                       shadow-sm border-b border-white/20 dark:border-gray-700/30">
      
      <nav className="container mx-auto px-6 py-3 flex justify-between items-center">
        <Link href="/">
          {/* --- IMAGE 1: Light Mode --- */}
          <Image
            src="/logo.png"
            alt="Shaila's Education Logo"
            width={100}
            height={30}
            priority
            className="w-auto h-auto object-contain block dark:hidden"
          />

          {/* --- IMAGE 2: Dark Mode --- */}
          <Image
            src="/logo-white.png"
            alt="Shaila's Education Logo"
            width={100}
            height={30}
            priority
            className="w-auto h-auto object-contain hidden dark:block"
          />
        </Link>

        <div className="flex items-center space-x-4 md:space-x-6">
          <Link
            href="/"
            className="text-gray-700 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400 font-medium"
          >
            Home
          </Link>
          <Link
            href="/courses"
            className="text-gray-700 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400 font-medium"
          >
            Courses
          </Link>
          <Link
            href="/contact"
            className="text-gray-700 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400 font-medium"
          >
            Contact
          </Link>

          <Link
            href="/terms"
            className="text-gray-700 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400 font-medium"
          >
            Terms
          </Link>

          {/* Auth Logic */}
          {status === 'loading' && (
            <div className="w-20 h-6 rounded-md bg-gray-300 dark:bg-gray-600 animate-pulse" />
          )}

          {status === 'unauthenticated' && (
            <Link
              href="/login"
              className="text-gray-700 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400 font-medium"
            >
              Sign In
            </Link>
          )}

          {status === 'authenticated' && (
            <>
              <Link
                href="/profile"
                className="text-gray-700 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400 font-medium"
              >
                My Profile
              </Link>
              <button
                onClick={() => signOut({ callbackUrl: '/' })}
                className="text-gray-700 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400 font-medium"
              >
                Sign Out
              </button>
              
              {session.user.image && (
                <Link href="/profile">
                  <Image
                    src={session.user.image}
                    alt="Profile"
                    width={32}
                    height={32}
                    className="rounded-full border border-gray-300 dark:border-gray-600"
                  />
                </Link>
              )}
            </>
          )}

          <ThemeSwitcher />
        </div>
      </nav>
    </header>
  );
}