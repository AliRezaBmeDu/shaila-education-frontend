import {  contactInfo } from '../../lib/termsData';
export default function ContactPage() {
  return (
    <div className="container mx-auto p-6 md:p-10">
      <section id="contact" className="bg-white dark:bg-gray-800 p-8 md:p-12 rounded-lg shadow-xl">
        <h2 className="text-4xl font-extrabold text-gray-900 dark:text-white mb-8 text-center">
          Get In Touch
        </h2>
        <p className="text-lg text-gray-600 dark:text-gray-400 text-center mb-10 max-w-2xl mx-auto">
          We'd love to hear from you. Please fill out the form below, and we will get back to you as soon as possible.
        </p>
        
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

      {/* --- Footer (Dark Theme) --- */}
            <footer className="bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-white py-12 mt-12 border-t border-gray-200 dark:border-gray-700">
              <div className="container mx-auto px-6 text-center">
                <h3 className="text-2xl font-bold mb-4">🟩 যোগাযোগ 🟩</h3>
                <p className="mb-2 text-lg">ACE - Ali’s Conceptual Education</p>
                <p className="mb-2">📍 {contactInfo.address}</p>
                <p className="mb-2">📞 হোয়াটসঅ্যাপ: {contactInfo.phone}</p>
                <p className="mb-6">✉️ ইমেইল: {contactInfo.email}</p>
                
                {/* --- THIS IS THE FIX --- */}
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  &copy; {new Date().getFullYear()} ACE-Ali's Conceptual Education. All rights reserved.
                </p> {/* <-- CORRECTED CLOSING TAG */}
      
              </div>
            </footer>
    </div>
  );
}