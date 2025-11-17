import { termsAndConditions, termsInfo, contactInfo } from '../../lib/termsData';
export default function TermsPage() {
  return (
        <section id="terms-and-conditions" className="bg-white dark:bg-gray-800 p-8 md:p-12 rounded-lg shadow-xl">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2 text-center">
            {termsInfo.mainTitle}
          </h2>
          <p className="text-2xl font-semibold text-blue-600 dark:text-blue-400 mb-8 text-center">
            {termsInfo.subTitle}
          </p>
          <div className="space-y-8">
            {termsAndConditions.map((term) => (
              <article key={term.id} className="border-b border-gray-200 dark:border-gray-700 pb-6 last:border-b-0 last:pb-0">
                <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                  🟦 {term.title}
                </h3>
                <ul className="list-disc list-inside space-y-2 text-gray-600 dark:text-gray-400 leading-relaxed">
                  {term.content.map((point, index) => (
                    <li key={index}>{point}</li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </section>
  )
}