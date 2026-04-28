import React from 'react';

const NewsletterSignup = () => {
  return (
    <section className="bg-blue-800 py-12 px-6"> 
      <div className="max-w-3xl mx-auto text-center">
        <h2 className="text-white text-3xl md:text-4xl font-semibold mb-10 leading-tight">
          Get the latest research updates, subscribe to our newsletter
        </h2>

        <form className="space-y-5">
          <div className="flex flex-col md:flex-row gap-6">
            {/* Name Input */}
            <input
              type="text"
              placeholder="Name"
              className="flex-1 p-4 bg-transparent border border-white rounded-md text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-white"
            />
            {/* Last Name Input */}
            <input
              type="text"
              placeholder="Last name"
              className="flex-1 p-4 bg-transparent border border-white rounded-md text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-white"
            />
          </div>

          {/* E-mail Input */}
          <input
            type="email"
            placeholder="E-mail"
            className="w-full p-4 bg-transparent border border-white rounded-md text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-white"
          />

          {/* Subscribe Button */}
          <button
            type="submit"
            className="w-full md:w-auto px-10 py-3 bg-blue-600 text-white font-semibold rounded-full hover:bg-blue-700 transition duration-300 ease-in-out shadow-lg"
          >
            Subscribe
          </button>
        </form>
      </div>
    </section>
  );
};

export default NewsletterSignup;