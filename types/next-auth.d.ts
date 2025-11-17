// types/next-auth.d.ts

import { DefaultSession, DefaultUser } from 'next-auth';
import { JWT } from 'next-auth/jwt';

// Define the Enrollment type
type Enrollment = {
  courseId: string;
  courseName: string;
  type: 'Online' | 'Offline';
  courseSlug: string;
};

// 1. Extend the User type
declare module 'next-auth' {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    user: {
      /** Your new properties */
      id: string;
      enrollments: Enrollment[];
      // ...any other custom properties
    } & DefaultSession['user']; // ... and the default properties (name, email, image)
  }

  /**
   * The shape of the user object returned in the OAuth providers'
   * profile callback, or the second parameter of the `session` callback, when using a database.
   */
  interface User extends DefaultUser {
    // Add your custom properties here
    enrollments: Enrollment[];
  }
}

// 2. Extend the JWT type
declare module 'next-auth/jwt' {
  /** Returned by the `jwt` callback and `getToken` */
  interface JWT {
    /** Your new properties */
    id: string;
    enrollments: Enrollment[];
  }
}