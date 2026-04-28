import React from "react";

// --- For WhySubmitPage ---
export const JournalSubmissionInfo = () => (
  <div className="py-10 px-6 bg-slate-50 text-center">
    <h2 className="text-3xl font-bold mb-4">Why publish with us?</h2>
    <p className="max-w-2xl mx-auto text-gray-700">Join a community that prioritizes impact, speed, and quality.</p>
  </div>
);
export const JournalSubmissionBenefits = () => (
  <div className="py-10 px-6 grid gap-6 md:grid-cols-3 max-w-7xl mx-auto">
    {["High Impact", "Fast Review", "Global Reach"].map(b => (
      <div key={b} className="bg-white p-6 rounded shadow text-center font-bold">{b}</div>
    ))}
  </div>
);
export const JournalSubmissionPromotion = () => (
  <div className="py-10 text-center bg-blue-600 text-white">
    <h3 className="text-2xl font-bold">Ready to submit?</h3>
  </div>
);

// --- For AuthorGuidelines ---
export const HarvardReferenceTable = () => <div className="my-4 p-4 border rounded bg-gray-50">Harvard Reference Table Placeholder</div>;
export const VancouverReferenceGuidelines = () => <div className="my-4">Vancouver Guidelines Placeholder</div>;
export const VancouverReferenceTable = () => <div className="my-4 p-4 border rounded bg-gray-50">Vancouver Reference Table Placeholder</div>;
export const CitationGuidelines = () => <div className="my-4">General Citation Guidelines Placeholder</div>;

// --- For PublishingFeesPage ---
export const PublishingFees = () => (
  <div className="py-10 px-6 max-w-7xl mx-auto">
    <h1 className="text-3xl font-bold mb-6">Publishing Fees</h1>
    <div className="p-6 border rounded bg-white">Fees Table Placeholder</div>
  </div>
);
export const ArticleTypes = () => <div className="py-10 px-6 max-w-7xl mx-auto"><h2 className="text-2xl font-bold">Article Types</h2></div>;
export const PartnershipsProgram = () => <div className="py-10 px-6 max-w-7xl mx-auto"><h2 className="text-2xl font-bold">Partnerships</h2></div>;

// --- For PeerReviewPage ---
export const PeerReviewUniqueSection = () => <div className="my-8">Unique Peer Review Process...</div>;
export const SafeHandsSection = () => <div className="my-8">Safe Hands Section...</div>;
export const EditorsReviewersSection = () => <div className="my-8">Editors & Reviewers Support...</div>;
export const TestimonialCard = () => <div className="my-8 p-6 bg-gray-100 rounded">"Excellent experience." - Author</div>;
export const WhatToReadNext = () => <div className="my-8">What to read next...</div>;