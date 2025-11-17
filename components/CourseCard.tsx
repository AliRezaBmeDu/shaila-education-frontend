import Link from 'next/link';
import Image from 'next/image';
import { urlFor } from '../lib/sanity.client';

export interface Course {
  _id: string;
  title: string;
  slug: {
    current: string;
  };
  mainImage: any;
  description: string;
}

interface CourseCardProps {
  course: Course;
}

export default function CourseCard({ course }: CourseCardProps) {
  return (
    // 1. The outer container is now a <div>, not a <Link>
    <div
      key={course._id}
      className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden flex flex-col h-full"
    >
      {/* 2. The Link now wraps only the image and title */}
      <Link href={`/courses/${course.slug.current}`}>
        {course.mainImage && (
          <Image
            src={urlFor(course.mainImage).width(500).height(500).url()}
            alt={course.title}
            width={500}
            height={500}
            className="w-full aspect-square object-cover object-top transition-transform duration-300 hover:scale-105"
          />
        )}
        <div className="p-5">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            {course.title}
          </h2>
        </div>
      </Link>

      {/* 3. The description is now separate */}
      <div className="p-5 pt-0 flex-grow">
        <p className="text-gray-600 dark:text-gray-400 line-clamp-3">
          {course.description}
        </p>
      </div>

      {/* 4. The "Enroll Now" button/link */}
      <div className="p-5 pt-0">
        <Link
          href={`/courses/${course.slug.current}/enroll`}
          className="block w-full text-center bg-blue-600 text-white px-6 py-3 rounded-md font-semibold hover:bg-blue-700 transition-colors"
        >
          Enroll Now
        </Link>
      </div>
    </div>
  );
}