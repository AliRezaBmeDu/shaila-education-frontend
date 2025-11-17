'use client';

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import MyCourses from '../../components/MyCourses'; // Correct the path if needed
import { useEffect } from 'react';

export default function ProfilePage() {
  const router = useRouter();
  const { data: session, status } = useSession();

  // 1. Protect the page
  // If the user is not authenticated, send them to the login page.
  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/login');
    }
  }, [status, router]);

  // 2. Show a loading state
  if (status === 'loading') {
    return (
      <div className="container mx-auto py-10 px-4 text-center">
        <p>Loading your profile...</p>
      </div>
    );
  }

  // 3. Render the profile page
  if (status === 'authenticated') {
    return (
      <div className="container mx-auto py-10 px-4 max-w-4xl">
        <div className="space-y-8">
          
          {/* Section 1: Basic Account Info */}
          <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-6">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              My Profile
            </h1>
            <div className="space-y-2">
              <div>
                <span className="font-semibold">Name:</span> {session.user.name || 'Not provided'}
              </div>
              <div>
                <span className="font-semibold">Email:</span> {session.user.email}
              </div>
              {/* You can add more fields here as you build them */}
              <button 
                onClick={() => alert('Password change feature coming soon!')} 
                className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
              >
                Change Password
              </button>
            </div>
          </div>

          {/* Section 2: My Courses (replaces the custom tab) */}
          <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-6">
            {/* This is the component you already built */}
            <MyCourses />
          </div>

        </div>
      </div>
    );
  }

  // Fallback for unauthenticated state (should be caught by the redirect)
  return null;
}