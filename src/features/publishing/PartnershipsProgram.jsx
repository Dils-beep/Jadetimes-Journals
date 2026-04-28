import React from 'react';
import { Link } from 'react-router-dom';

function PartnershipsProgram() {
  return (
    <div className="min-h-screen bg-white flex items-start justify-start p-4 sm:p-6 md:p-8 lg:p-12">     
      <div className="max-w-3xl w-full bg-white rounded-lg shadow-lg p-8 md:p-10 border border-gray-100 ml-0 sm:ml-4 md:ml-8 lg:ml-12">
        
        <h2 className="text-md md:text-xl font-semibold mb-4 text-gray-800">
          Heard about the partnerships program?
        </h2>
        
        <p className="mb-6 leading-relaxed text-gray-700">
          If your institution is partnered with us you can benefit from full or partial support for article processing charges (APCs) on manuscripts you submit.
        </p>

        <div className="flex flex-wrap items-center space-x-4 mb-10 text-md font-medium">
          <Link 
            to="/services/institutional-partnerships" 
            className="text-green-700 hover:text-green-800 hover:underline flex items-center transition duration-150 ease-in-out"
          >
            Learn more 
            <span className="ml-1 text-base">›</span>
          </Link>

          <span className="text-gray-300 hidden sm:inline">|</span>
          <Link 
            to="/research/benefits" 
            className="text-green-700 hover:text-green-800 hover:underline flex items-center transition duration-150 ease-in-out mt-2 sm:mt-0"
          >
            Discover benefits for researchers
            <span className="ml-1 text-base">›</span>
          </Link>
        </div>

        <p className="mb-6 leading-relaxed text-gray-700">
          We also provide a support program for authors and institutions with insufficient funding.<br /> 
          Authors in countries classified by the World Bank as low or lower-middle income countries<br /> 
          may be eligible for discounts to their APC.
        </p>
        
        <button className="px-6 py-2 border border-green-600 text-green-600 font-medium rounded-full hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50 transition duration-150 ease-in-out">
          Apply for fee support
        </button>

      </div>
    </div>
  );
}

export default PartnershipsProgram;