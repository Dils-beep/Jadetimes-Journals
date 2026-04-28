import React from "react";
import { Link } from "react-router-dom";
import { FaFacebookF, FaLinkedinIn, FaInstagram, FaYoutube } from "react-icons/fa6";

export default function Footer() {
  return (
    <footer className="bg-white border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-8 py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-12">

          {/* --- Guidelines Column --- */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Guidelines</h4>
            <ul className="space-y-3 text-gray-700">
              <li><Link to="/publishing/author-guidelines" className="hover:underline">Author guidelines</Link></li>
              <li><Link to="/publishing/author-services" className="hover:underline">Services for authors</Link></li>
              <li><Link to="/publishing/submission-checklist" className="hover:underline">Submission checklist</Link></li>
              <li><Link to="/publishing/editor-guidelines" className="hover:underline">Editor guidelines</Link></li>
              <li><Link to="/publishing/fee-policy" className="hover:underline">Fee policy</Link></li>
            </ul>
          </div>

          {/* --- Explore Column --- */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Explore</h4>
            <ul className="space-y-3 text-gray-700">
              <li><Link to="/publishing/why-submit" className="hover:underline">Why submit?</Link></li>
              <li><Link to="/articles" className="hover:underline">Articles</Link></li>
              <li><Link to="/research/topics" className="hover:underline">Research Topics</Link></li>
              <li><Link to="/journals" className="hover:underline">Journals</Link></li>
              <li><Link to="/publishing/how-we-publish" className="hover:underline">How we publish</Link></li>
            </ul>
          </div>

          {/* --- Connect Column --- */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Connect</h4>
            <ul className="space-y-3 text-gray-700">
              <li><Link to="/contact" className="hover:underline">Help center</Link></li>
              <li><Link to="/contact" className="hover:underline">Contact us</Link></li>
              <li><Link to="/publishing/peer-review" className="hover:underline">Submit</Link></li>
            </ul>
          </div>

          {/* --- Follow us --- */}
          <div>
            <h4 className="text-lg font-semibold mb-6">Follow us</h4>
            <div className="flex gap-4 sm:gap-6 text-gray-600 text-xl flex-wrap">
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-blue-600"><FaInstagram /></a>
              <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="hover:text-blue-600"><FaYoutube /></a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="hover:text-blue-600"><FaLinkedinIn /></a>
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="hover:text-blue-600"><FaFacebookF /></a>
            </div>
          </div>
        </div>

        {/* Bottom section */}
        <div className="border-t mt-12 pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-gray-500">
          <p>&copy; 2025 Jadetimes International Journals LLC. All Rights Reserved</p>
          <div className="flex space-x-4 mt-4 md:mt-0">
            <Link to="/privacy-policy" className="hover:underline">Privacy policy</Link>
            <span>|</span>
            <Link to="/terms-conditions" className="hover:underline">Terms and conditions</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}