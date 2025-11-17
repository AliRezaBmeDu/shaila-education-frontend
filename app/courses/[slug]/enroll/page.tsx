import { sanityClient } from '../../../../lib/sanity.client';
import { notFound } from 'next/navigation';
import Link from 'next/link';

// 1. Define the type for our new data
interface CourseFeeData {
  title: string;
  onlineFee: string;
  offlineFee: string;
  bkashNumber: string;
}

// 2. Create a function to fetch ONE course's fee data
async function getCourseFeeData(slug: string) {
  const query = `*[_type == "course" && slug.current == $slug][0]{
    title,
    onlineFee,
    offlineFee,
    bkashNumber
  }`;
  
  const courseData = await sanityClient.fetch(query, { slug }, {
    next: {
      revalidate: 0 // Always get fresh data
    }
  });
  return courseData;
}

// 3. This is the main page component
export default async function EnrollPage({ params }: { params: { slug: string } }) {
  const course: CourseFeeData = await getCourseFeeData(params.slug);

  // 4. If no course is found, show the 404 page
  if (!course) {
    notFound();
  }

  return (
    <div className="container mx-auto p-6 md:p-10">
      {/* 5. The Content Card */}
      <div className="max-w-2xl mx-auto bg-white dark:bg-gray-800 rounded-lg shadow-xl p-8 md:p-12">
        <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-white mb-4">
          Enroll in: {course.title}
        </h1>
        
        <p className="text-lg text-gray-600 dark:text-gray-400 mb-8">
          Complete your payment using the details below and contact us to confirm your admission.
        </p>

        {/* Fee Structure */}
        <div className="space-y-4 mb-8">
          <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100">Fee Structure</h2>
          <div className="flex justify-between items-center bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
            <span className="text-lg font-medium text-gray-700 dark:text-gray-300">Online Fee:</span>
            <span className="text-xl font-bold text-blue-600 dark:text-blue-400">
              {course.onlineFee || 'N/A'}
            </span>
          </div>
          <div className="flex justify-between items-center bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
            <span className="text-lg font-medium text-gray-700 dark:text-gray-300">Offline Fee:</span>
            <span className="text-xl font-bold text-blue-600 dark:text-blue-400">
              {course.offlineFee || 'N/A'}
            </span>
          </div>
        </div>

        {/* Payment Details */}
        <div className="space-y-4">
          <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100">Payment Details</h2>
          <div className="bg-blue-50 dark:bg-gray-700 p-6 rounded-lg text-center">
            <p className="text-lg font-medium text-gray-700 dark:text-gray-300 mb-2">
              Bkash Personal Number:
            </p>
            <p className="text-3xl font-extrabold text-blue-700 dark:text-blue-400 tracking-wider">
              {course.bkashNumber || 'Contact for number'}
            </p>
          </div>
        </div>

        {/* Back Button */}
        <div className="mt-10 text-center">
          <Link 
            href={`/courses/${params.slug}`}
            className="text-blue-600 dark:text-blue-400 hover:underline"
          >
            &larr; Go back to course details
          </Link>
        </div>

      </div>
    </div>
  );
}