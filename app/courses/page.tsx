import { sanityClient } from '../../lib/sanity.client'; 

import CourseCard, { Course } from '../../components/CourseCard'; 

async function getCourses(): Promise<Course[]> {
  const query = `*[_type == "course"]{
    _id,
    title,
    slug,
    mainImage,
    description
  }`;
  
  const courses = await sanityClient.fetch(query, {}, {
    next: {
      revalidate: 0 // Forces a fresh fetch every time
    }
  });

  return courses;
}

export default async function CoursesPage() {
  const courses = await getCourses();

  return (
    // Background is inherited from the layout
    <div className="container mx-auto p-6 md:p-10">
      
      {/* 1. ADD DARK MODE STYLES TO THE TITLE */}
      <h1 className="text-4xl font-extrabold text-blue-700 dark:text-blue-400 mb-8">
        Our Courses
      </h1>
      
      {courses.length === 0 ? (
        <p>No courses available at this time. Please check back later!</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {courses.map((course) => (
            <CourseCard key={course._id} course={course} />
          ))}
        </div>
      )}
    </div>
  );
}