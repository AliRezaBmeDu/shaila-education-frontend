import Link from 'next/link';

export default function NotEnrolledNotice() {
  return (
    <div className="container mx-auto p-6 md:p-10">
      <div className="max-w-2xl mx-auto bg-white dark:bg-gray-800 rounded-lg shadow-xl p-8 md:p-12 text-center">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
          Access Denied
        </h2>
        <p className="text-lg text-gray-600 dark:text-gray-400 mb-8">
          You have to enroll in this course to see the lesson contents.
        </p>
        <Link 
          href="/"
          className="inline-block bg-blue-600 text-white px-8 py-3 rounded-md font-semibold hover:bg-blue-700 transition-colors"
        >
          Go to Homepage
        </Link>
      </div>
    </div>
  );
}