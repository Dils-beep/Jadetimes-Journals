import React from "react";

export const ApplyForm = () => (
  <div className="max-w-3xl bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
    <h2 className="text-xl font-medium text-gray-800 mb-6 border-b pb-2">Apply to join</h2>
    <form className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <input type="text" placeholder="First name *" className="border p-3 rounded-md w-full" />
        <input type="text" placeholder="Last name *" className="border p-3 rounded-md w-full" />
      </div>
      <input type="email" placeholder="Email *" className="border p-3 rounded-md w-full" />
      <input type="text" placeholder="Affiliation *" className="border p-3 rounded-md w-full" />
      <input type="text" placeholder="LinkedIn Profile URL" className="border p-3 rounded-md w-full" />
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Upload CV</label>
        <input type="file" className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100" />
      </div>
      <button type="submit" className="bg-blue-600 text-white py-3 px-8 rounded-full font-semibold hover:bg-blue-700">
        Submit application
      </button>
    </form>
  </div>
);

export const ReferForm = () => (
  <div className="max-w-3xl bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
    <h2 className="text-xl font-medium text-gray-800 mb-6 border-b pb-2">Refer a colleague</h2>
    <form className="space-y-6">
      <p className="text-sm font-bold text-gray-700">Colleague's Details</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <input type="text" placeholder="First name *" className="border p-3 rounded-md w-full" />
        <input type="text" placeholder="Last name *" className="border p-3 rounded-md w-full" />
      </div>
      <input type="email" placeholder="Colleague Email *" className="border p-3 rounded-md w-full" />

      <p className="text-sm font-bold text-gray-700 mt-6">Your Details</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <input type="text" placeholder="Your First name *" className="border p-3 rounded-md w-full" />
        <input type="text" placeholder="Your Last name *" className="border p-3 rounded-md w-full" />
      </div>
      <button type="submit" className="bg-blue-600 text-white py-3 px-8 rounded-full font-semibold hover:bg-blue-700">
        Submit referral
      </button>
    </form>
  </div>
);