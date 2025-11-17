import { sanityClient } from '../../../../../lib/sanity.client';
import { notFound } from 'next/navigation';
import { PortableText } from '@portabletext/react';
import { getFile } from '@sanity/asset-utils';

// --- 1. IMPORT NEXTAUTH ---
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/authOptions'; // Adjust path if needed

// --- 2. IMPORT YOUR BUNNY.NET PLAYER ---
import MyVideoPlayer from '../../../../../components/MyVideoPlayer'; // This is your react-player component
import NotEnrolledNotice from '../../../../../components/NotEnrolledNotice';

// --- 3. DEFINE TYPES ---
type Enrollment = {
  courseId: string;
  // Add other fields if needed
}

// Updated Lesson interface
interface Lesson {
  title: string;
  videoBunnyId: string; // <-- Changed from videoLecture
  content: any[];
  lectureNotes: {
    asset: {
      _ref: string;
      _type: string;
    };
  };
  quiz: {
    title: string;
  };
  course: {
    _id: string;
  };
}

// --- 4. UPDATED SANITY QUERY ---
async function getLesson(lessonSlug: string) {
  const query = `*[_type == "lesson" && slug.current == $lessonSlug][0]{
    title,
    videoBunnyId, // <-- Fetched the new field
    content,
    lectureNotes,
    quiz->{
      title
    },
    "course": *[_type == "course" && references(^._id)][0]{
      _id
    }
  }`;

  const lesson = await sanityClient.fetch(query, { lessonSlug }, {
    next: { revalidate: 0 } // No caching for this page
  });
  return lesson;
}

// --- 5. THIS IS AN ASYNC SERVER COMPONENT ---
export default async function LessonPage({ params }: { params: { lessonSlug: string } }) {
  
  // Fetch the lesson
  const lesson: Lesson = await getLesson(params.lessonSlug);

  if (!lesson || !lesson.course) {
    // notFound();
    // Using this is a good fallback
    return <NotEnrolledNotice />;
  }

  // --- 6. NEW NEXTAUTH AUTHENTICATION LOGIC ---
  const session = await getServerSession(authOptions);
  let isEnrolled = false;

  if (session && session.user && session.user.enrollments) {
    // Get enrollments from the session (which we added in the callbacks)
    const enrollments = session.user.enrollments as Enrollment[] || [];
    isEnrolled = enrollments.some(e => e.courseId === lesson.course._id);
  }
  // ---------------------------------------------

  // 7. If not enrolled, show the "lock" page
  if (!isEnrolled) {
    return <NotEnrolledNotice />;
  }

  // 8. If they ARE enrolled, get the PDF URL and show the lesson
  // (This logic is unchanged, it's correct)
  let pdfUrl: string | null = null;
  if (lesson.lectureNotes?.asset) {
    const fileConfig = {
      projectId: sanityClient.config().projectId!,
      dataset: sanityClient.config().dataset!,
    };
    const url = getFile(lesson.lectureNotes.asset, fileConfig).url;
    if (typeof url === 'string') {
      pdfUrl = url;
    }
  }

  return (
    <div className="container mx-auto p-6 md:p-10">
      <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white mb-6">
        {lesson.title}
      </h1>

      {/* --- 9. BUNNY.NET VIDEO PLAYER --- */}
      {lesson.videoBunnyId && (
        <div className="mb-8 overflow-hidden rounded-lg shadow-lg">
          {/* Use your Bunny.net player component */}
          <MyVideoPlayer 
            videoId={lesson.videoBunnyId} 
          />
        </div>
      )}
      {/* ---------------------------------- */}

      {/* Main Content Area */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Lesson Text */}
        <div className="lg:col-span-2 bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold text-gray-700 dark:text-gray-300 mb-4">Lesson Details</h2>
          <div className="prose prose-lg max-w-none text-gray-800 dark:text-gray-200">
            <PortableText value={lesson.content} />
          </div>
        </div>

        {/* Sidebar for PDF and Quiz */}
        <aside className="lg:col-span-1 space-y-6">
          
          {/* PDF Download */}
          {pdfUrl && (
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-bold text-gray-700 dark:text-gray-300 mb-3">Resources</h3>
              <a
                href={pdfUrl}
                target="_blank"
                rel="noopener noreferrer"
                download
                className="inline-block w-full text-center bg-blue-600 text-white px-6 py-3 rounded-md font-semibold hover:bg-blue-700 transition-colors"
              >
                Download Lecture Notes (PDF)
              </a>
            </div>
          )}

          {/* Quiz Link (Coming Soon) */}
          {lesson.quiz && (
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-bold text-gray-700 dark:text-gray-300 mb-3">Quiz</h3>
              <p className="text-gray-600 dark:text-gray-400 mb-4">Test your knowledge with the "{lesson.quiz.title}" quiz.</p>
              <button
                disabled
                className="w-full text-center bg-gray-400 text-white px-6 py-3 rounded-md font-semibold cursor-not-allowed"
              >
                Start Quiz (Coming Soon)
              </button>
            </div>
          )}
        </aside>
      </div>
    </div>
  );
}