import { sanityClient } from '../lib/sanity.client';
import Image from 'next/image';

// 1. Import all our new data and components
import {  contactInfo } from '../lib/termsData';
import { Course } from '../components/CourseCard';
import CourseCarousel from '../components/CourseCarousel';

// Fetches courses from Sanity with no caching
async function getCourses() {
  const query = `*[_type == "course"]{
    _id,
    title,
    slug,
    mainImage,
    description
  }`;
  
  const courses = await sanityClient.fetch(query, {}, {
    next: {
      revalidate: 0 // Disables cache
    }
  });

  return courses;
}

export default async function HomePage() {
  const courses: Course[] = await getCourses();

  return (
    // Background color is now handled by layout.tsx
    <div className="min-h-screen">
      
      {/* --- THIS IS THE FIX --- */}
      {/* Hero Section */}
      <section className="py-16 text-center"> {/* 1. Added padding around the card */}
        <div className="container mx-auto px-6"> {/* 2. Container to center the card */}
          
          {/* 3. This is the new "Card" with hover effects */}
          <div className="bg-blue-100 dark:bg-gray-700 text-gray-900 dark:text-gray-100 py-16 px-6 rounded-lg shadow-xl 
                          transition-all duration-300 ease-in-out 
                          hover:scale-[1.02] hover:-translate-y-1 hover:shadow-2xl dark:hover:shadow-blue-900/40">
            
            {/* <div className="flex justify-center mb-6">
              <Image
                src="/logo.png"
                alt="ACE-Ali's Education Logo"
                width={180}
                height={48}
                priority
              />
            </div> */}

            <h1 className="text-4xl md:text-5xl font-extrabold mb-4">
              Welcome to learn with Shaila
            </h1>
            <p className="text-xl md:text-2xl">
              Your journey to knowledge starts here.
            </p>
          </div>

        </div>
      </section>

      {/* Main Content Area */}
      <main className="container mx-auto p-6 md:p-10 space-y-20">

        {/* --- 1. Courses We Offer (Carousel) --- */}
        <section id="courses">
          <h2 className="text-4xl font-extrabold text-gray-900 dark:text-white mb-8 text-center">
            Courses We Offer
          </h2>
          {/* Use the new auto-sliding carousel component */}
          <CourseCarousel courses={courses} />
        </section>

        {/* --- 2. Contact Us Section (Dark Theme) --- */}
        <section id="contact" className="bg-white dark:bg-gray-800 p-8 md:p-12 rounded-lg shadow-xl">
          <h2 className="text-4xl font-extrabold text-gray-900 dark:text-white mb-8 text-center">
            Get In Touch
          </h2>
          <form className="max-w-2xl mx-auto space-y-6">
            <div>
              <label htmlFor="name" className="block text-lg font-medium text-gray-700 dark:text-gray-300 mb-2">
                Your Name
              </label>
              <input
                type="text"
                id="name"
                className="w-full px-4 py-3 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Ali Ahmed"
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-lg font-medium text-gray-700 dark:text-gray-300 mb-2">
                Your Email
              </label>
              <input
                type="email"
                id="email"
                className="w-full px-4 py-3 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="ali@example.com"
              />
            </div>
            <div>
              <label htmlFor="message" className="block text-lg font-medium text-gray-700 dark:text-gray-300 mb-2">
                Your Message
              </label>
              <textarea
                id="message"
                rows={5}
                className="w-full px-4 py-3 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="I'd like to know more about..."
              ></textarea>
            </div>
            <div className="text-center">
              <button
                type="submit"
                className="px-10 py-3 bg-blue-600 text-white text-lg font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                Send Message
              </button>
            </div>
          </form>
        </section>

      </main>

      {/* --- Footer (Dark Theme) --- */}
      <footer className="bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-white py-12 mt-12 border-t border-gray-200 dark:border-gray-700">
        <div className="container mx-auto px-6 text-center">
          <h3 className="text-2xl font-bold mb-4">🟩 Contact 🟩</h3>
          <p className="mb-2 text-lg">Shaila’s Professional Education</p>
          <p className="mb-2">📍 {contactInfo.address}</p>
          <p className="mb-2">📞 whatsapp: {contactInfo.phone}</p>
          <p className="mb-6">✉️ e-mail: {contactInfo.email}</p>
          
          {/* --- THIS IS THE FIX --- */}
          <p className="text-gray-600 dark:text-gray-400 text-sm">
            &copy; {new Date().getFullYear()} Shaila's Professional Education. All rights reserved.
          </p> {/* <-- CORRECTED CLOSING TAG */}

        </div>
      </footer>

    </div>
  );
}