'use client';

import Link from 'next/link';
import Image from 'next/image';

// 2. Import NextAuth hooks
import { useSession, signOut } from 'next-auth/react';

import ThemeSwitcher from './ThemeSwitcher';
import { usePathname } from 'next/navigation'; // Import the hook

export default function Navbar() {
  // Get the current page's URL
  const pathname = usePathname();
  const isHomepage = pathname === '/';

  // 3. Get the NextAuth session status
  const { data: session, status } = useSession();

  return (
    <header className="bg-gray-100 dark:bg-gray-800 shadow-lg w-full">
      <nav className="container mx-auto px-6 py-3 flex justify-between items-center">
        <Link href="/">
          <Image
            src="/logo.png"
            alt="Shaila's Education Logo"
            width={150}
            height={40}
            priority
          />
        </Link>

        <div className="flex items-center space-x-4 md:space-x-6">
          <Link
            href="/"
            className="text-gray-700 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400"
          >
            Home
          </Link>
          <Link
            href="/courses"
            className="text-gray-700 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400"
          >
            Courses
          </Link>
          <Link
            href="/contact"
            className="text-gray-700 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400"
          >
            Contact
          </Link>

          {/* Conditionally render the "Terms" link
          {isHomepage && (
            <a
              href="#terms-and-conditions"
              className="text-gray-700 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400"
            >
              Terms
            </a>
          )} */}

          <Link
            href="/terms"
            className="text-gray-700 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400"
          >
            Terms
          </Link>

          {/* 4. Start: This block replaces the UserButton and /profile link logic */}
          
          {/* Show a loading state */}
          {status === 'loading' && (
            <div className="w-20 h-6 rounded-md bg-gray-300 dark:bg-gray-600 animate-pulse" />
          )}

          {/* Show Sign In if unauthenticated */}
          {status === 'unauthenticated' && (
            <Link
              href="/login" // Link to your custom login page
              className="text-gray-700 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400"
            >
              Sign In
            </Link>
          )}

          {/* Show Profile and Sign Out if authenticated */}
          {status === 'authenticated' && (
            <>
              <Link
                href="/profile"
                className="text-gray-700 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400"
              >
                My Profile
              </Link>
              <button
                onClick={() => signOut({ callbackUrl: '/' })} // Sign out and redirect to home
                className="text-gray-700 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400"
              >
                Sign Out
              </button>
              
              {/* Optional: Show user avatar if it exists in the session */}
              {session.user.image && (
                <Link href="/profile">
                  <Image
                    src={session.user.image}
                    alt="Profile"
                    width={32}
                    height={32}
                    className="rounded-full"
                  />
                </Link>
              )}
            </>
          )}
          {/* End: Auth block */}

          <ThemeSwitcher />
        </div>
      </nav>
    </header>
  );
}