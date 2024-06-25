import React from "react";

const Faqs = () => {
  return (
    <section>
      {" "}
      <div className="space-y-4">
        <details className="group border-s-4 border-primary bg-white shadow-lg dark:bg-gray-900 rounded-lg p-6 [&_summary::-webkit-details-marker]:hidden" open>
          <summary className="flex cursor-pointer items-center justify-between gap-1.5">
            <h2 className="text-lg font-medium text-gray-900 dark:text-gray-100"> How can I contact customer support?</h2>

            <span className="shrink-0 rounded-full bg-white hover:bg-gray-50 dark:bg-primary dark:hover:bg-primary/90 group p-1.5 text-gray-900 sm:p-3">
              <svg xmlns="http://www.w3.org/2000/svg" className="size-5 shrink-0 transition duration-300 group-open:-rotate-45" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
              </svg>
            </span>
          </summary>

          <p className="mt-4 leading-relaxed text-gray-700 dark:text-gray-400">
            You can reach our customer support team via email at [support@example.com] or through our contact form on the website. Our team is available Monday to Friday, 9 AM to 5 PM
          </p>
        </details>

        <details className="group border-s-4 border-primary bg-white shadow-lg dark:bg-gray-900 rounded-lg p-6 [&_summary::-webkit-details-marker]:hidden">
          <summary className="flex cursor-pointer items-center justify-between gap-1.5">
            <h2 className="text-lg font-medium text-gray-900 dark:text-gray-100">Are the product details and specifications accurate?</h2>

            <span className="shrink-0 rounded-full bg-white hover:bg-gray-50 dark:bg-primary dark:hover:bg-primary/90 group p-1.5 text-gray-900 sm:p-3">
              <svg xmlns="http://www.w3.org/2000/svg" className="size-5 shrink-0 transition duration-300 group-open:-rotate-45" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
              </svg>
            </span>
          </summary>

          <p className="mt-4 leading-relaxed text-gray-700 dark:text-gray-400">
            We strive to ensure all information on our website is accurate and up-to-date. However, we recommend double-checking details with the official manufacturer or service provider.
          </p>
        </details>
        <details className="group border-s-4 border-primary bg-white shadow-lg dark:bg-gray-900 rounded-lg p-6 [&_summary::-webkit-details-marker]:hidden">
          <summary className="flex cursor-pointer items-center justify-between gap-1.5">
            <h2 className="text-lg font-medium text-gray-900 dark:text-gray-100">How do I create an account?</h2>

            <span className="shrink-0 rounded-full bg-white hover:bg-gray-50 dark:bg-primary dark:hover:bg-primary/90 group p-1.5 text-gray-900 sm:p-3">
              <svg xmlns="http://www.w3.org/2000/svg" className="size-5 shrink-0 transition duration-300 group-open:-rotate-45" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
              </svg>
            </span>
          </summary>

          <p className="mt-4 leading-relaxed text-gray-700 dark:text-gray-400">
            Click on the “Sign Up” button at the top right corner of the homepage and follow the instructions to create an account. You’ll need a valid email address to complete the registration.
          </p>
        </details>
        <details className="group border-s-4 border-primary bg-white shadow-lg dark:bg-gray-900 rounded-lg p-6 [&_summary::-webkit-details-marker]:hidden">
          <summary className="flex cursor-pointer items-center justify-between gap-1.5">
            <h2 className="text-lg font-medium text-gray-900 dark:text-gray-100">How do you protect my personal information?</h2>

            <span className="shrink-0 rounded-full bg-white hover:bg-gray-50 dark:bg-primary dark:hover:bg-primary/90 group p-1.5 text-gray-900 sm:p-3">
              <svg xmlns="http://www.w3.org/2000/svg" className="size-5 shrink-0 transition duration-300 group-open:-rotate-45" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
              </svg>
            </span>
          </summary>

          <p className="mt-4 leading-relaxed text-gray-700 dark:text-gray-400">We take your privacy seriously and use industry-standard security measures to protect your data. For more details, please read our Privacy Policy.</p>
        </details>

        <details className="group border-s-4 border-primary bg-white shadow-lg dark:bg-gray-900 rounded-lg p-6 [&_summary::-webkit-details-marker]:hidden">
          <summary className="flex cursor-pointer items-center justify-between gap-1.5">
            <h2 className="text-lg font-medium text-gray-900 dark:text-gray-100">What should I do if I encounter technical issues on the website?</h2>

            <span className="shrink-0 rounded-full bg-white hover:bg-gray-50 dark:bg-primary dark:hover:bg-primary/90 group p-1.5 text-gray-900 sm:p-3">
              <svg xmlns="http://www.w3.org/2000/svg" className="size-5 shrink-0 transition duration-300 group-open:-rotate-45" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
              </svg>
            </span>
          </summary>

          <p className="mt-4 leading-relaxed text-gray-700 dark:text-gray-400">
            If you experience any technical issues, please contact our support team at [support@example.com]. Provide a detailed description of the problem, including screenshots if possible.
          </p>
        </details>
      </div>
    </section>
  );
};

export default Faqs;
