import React from 'react';
import { Link } from 'react-router-dom';

function PublishingFees() {
  return (
    <div className="mb-12">
      <h2 className="text-3xl font-bold mb-6 text-gray-900">
        Publication Fees
      </h2>
      <p className="mb-6 leading-relaxed max-w-4xl text-gray-700">
        Jadetimes Journal of Universal Studies (JJUS) operates under a no-fee, open-access publishing model.
      </p>
      <ul className="list-disc pl-5 mb-6 space-y-1 text-gray-700">
        <li>No submission fees</li>
        <li>No article processing charges (APCs)</li>
        <li>No publication fees</li>
        <li>No review fees</li>
      </ul>
      <p className="mb-8 leading-relaxed max-w-4xl text-gray-700">
        Authors are <span className="font-bold">not charged</span> at any stage of the submission, review, or publication process. The journal is committed to <span className="font-bold">equitable and inclusive scholarly publishing</span>, ensuring that the ability to publish is not influenced by financial constraints.
      </p>

      <h3 className="text-2xl font-bold mb-4 text-gray-900">
        Optional Charges
      </h3>
      <p className="leading-relaxed max-w-4xl text-gray-700">
        There are <span className="font-bold">no mandatory charges</span> for standard publications. In exceptional cases, authors may be contacted <span className="font-bold">only if</span> optional services (such as extensive language editing or special formatting requests) are requested by the author. Any such charges, if applicable, will be <span className="font-bold">clearly communicated in advance</span>, and author consent will be obtained before proceeding.
      </p>
    </div>
  );
}

export default PublishingFees;