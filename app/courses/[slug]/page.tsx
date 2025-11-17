// app/courses/[slug]/page.tsx
import Image from 'next/image';
import { sanityClient, urlFor } from '../../../lib/sanity.client';
import { notFound } from 'next/navigation';
import Link from 'next/link'; // 1. IMPORT LINK

// 1. Define the types for our new data
interface Lesson {
  _id: string;
  title: string;
  slug: { current: string }; // 2. ADD SLUG TO INTERFACE
}

interface CourseModule {
  _id: string;
  title: string;
  lessons: Lesson[];
}

interface Course {
  title: string;
  mainImage: any;
  description: string;
  modules: CourseModule[];
}

// 2. Create a function to fetch ONE course
async function getCourse(slug: string) {
  // 3. Write the GROQ query to get the specific course
  const query = `*[_type == "course" && slug.current == $slug][0]{
    title,
    mainImage,
    description,
    "modules": modules[]->{
      _id,
      title,
      "lessons": lessons[]->{
        _id,
        title,
        slug
      }
    }
  }`;
  
  // 4. Fetch the data, passing the slug as a parameter
  const course = await sanityClient.fetch(query, { slug });
  return course;
}

// 5. This is the main page component
export default async function CourseDetailPage({ params }: { params: { slug: string } }) {
  
  // Await the params to resolve them (a Turbopack/Next.js 14+ requirement)
  const resolvedParams = await params;
  
  const course: Course = await getCourse(resolvedParams.slug); // Use the resolved slug

  // 6. If no course is found, show the 404 page
  if (!course) {
    notFound();
  }

  return (
    <div className="container mx-auto p-6 md:p-10">
      
      {/* Course Header */}
      <div className="mb-10">
        {course.mainImage && (
          <Image
            src={urlFor(course.mainImage).width(1200).height(400).url()}
            alt={course.title}
            width={1200}
            height={400}
            className="w-full h-64 md:h-80 object-cover rounded-lg shadow-lg"
            priority
          />
        )}
        <h1 className="text-4xl md:text-5xl font-extrabold text-gray-800 mt-6 mb-4">
          {course.title}
        </h1>
        <p className="text-lg text-gray-600">{course.description}</p>
      </div>

      {/* Course Modules */}
      <div className="space-y-8">
        {course.modules?.map((module) => (
          <section key={module._id} className="bg-white p-6 rounded-lg shadow-md border border-gray-100">
            <h2 className="text-3xl font-bold text-blue-700 mb-5">{module.title}</h2>
            
            {/* Lessons List */}
            <ul className="space-y-3">
              {module.lessons?.map((lesson) => ( // <-- THIS IS THE FIX
                // 3. WRAP THE <li> WITH A <Link>
                <Link
                  href={`/courses/${resolvedParams.slug}/lesson/${lesson.slug.current}`}
                  key={lesson._id}
                >
                  <li className="flex items-center p-3 bg-gray-50 rounded-md hover:bg-gray-100 transition-colors">
                    <span className="text-blue-500 mr-3">
                      {/* Simple Play Icon */}
                      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20"><path d="M6.3 2.841A1.5 1.5 0 004 4.11v11.78a1.5 1.5 0 002.3 1.269l8.62-5.89a1.5 1.5 0 000-2.538L6.3 2.84z"></path></svg>
                    </span>
                    <span className="text-lg text-gray-700">{lesson.title}</span>
                  </li>
                </Link>
              ))}
            </ul>

          </section>
        ))}
      </div>
    </div>
  );
}