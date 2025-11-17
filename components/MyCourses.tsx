// components/MyCourses.tsx
'use client';

// 1. Import useSession from next-auth/react
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import React from 'react'; // Good to import React

// 2. Define the type for our enrollment data (this can stay the same)
type Enrollment = {
  courseId: string;
  courseName: string;
  type: 'Online' | 'Offline';
  courseSlug: string;
}

export default function MyCourses() {
  // 3. Use the useSession hook
  const { data: session, status } = useSession();

  // 4. Get the user from the session object
  const user = session?.user;
  
  // 5. Access enrollments from session.user
  // (This assumes you've added 'enrollments' to your session callback)
  const enrollments = user?.enrollments as Enrollment[] || [];

  // 6. Handle the loading state
  if (status === 'loading') {
    return (
      <div className="space-y-6">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
          My Enrolled Courses
        </h2>
        <p className="text-gray-600 dark:text-gray-400">Loading your courses...</p>
      </div>
    );
  }

  // 7. Handle unauthenticated state (optional but recommended)
  if (status === 'unauthenticated' || !user) {
    return (
      <div className="space-y-6">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
          My Enrolled Courses
        </h2>
        <p className="text-gray-600 dark:text-gray-400">
          Please <Link href="/login" className="text-blue-500 hover:underline">log in</Link> to see your courses.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
        My Enrolled Courses
      </h2>
      
      {enrollments.length === 0 ? (
        <p className="text-gray-600 dark:text-gray-400">You are not yet enrolled in any courses.</p>
      ) : (
        // The rest of your JSX logic is perfect and needs no changes
        <ul className="space-y-4">
          {enrollments.map((enrollment) => (
            <li 
              key={enrollment.courseId} 
              className="flex flex-col sm:flex-row justify-between sm:items-center bg-gray-50 dark:bg-gray-700 p-4 rounded-lg shadow"
            >
              <div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white">{enrollment.courseName}</h3>
                <p className="text-gray-600 dark:text-gray-400">{enrollment.type} Course</p>
              </div>
              <Link 
                href={`/courses/${enrollment.courseSlug}`}
                className="mt-3 sm:mt-0 text-blue-600 dark:text-blue-400 hover:underline"
              >
                View Course
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}