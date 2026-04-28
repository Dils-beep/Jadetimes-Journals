import React from 'react';

function ArticleTypes() {
  return (
    <div className="bg-white text-gray-800 mb-12">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* 1. Original Research Articles */}
        <div className="flex gap-4">
          <div className="flex-shrink-0 w-12 h-12 rounded-full bg-slate-900 text-white flex items-center justify-center text-xl font-bold">1</div>
          <div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Original Research Articles</h3>
            <p className="text-gray-700 mb-4">
              Original Research Articles should present empirical, theoretical, or methodological studies that contribute meaningfully to the field of Sociology.
            </p>
            <ul className="list-disc pl-5 space-y-1 text-gray-700">
              <li>Manuscripts must demonstrate a clear sociological framework</li>
              <li>The study should offer original insights, analysis, or findings</li>
              <li>Research may use quantitative, qualitative, or mixed-methods approaches</li>
              <li>Typical length: up to 5,000 words, including references, tables, and figures</li>
            </ul>
            <p className="mt-4 text-gray-700">
              Please refer to the <a href="/publishing/author-guidelines" className="text-blue-600 hover:underline">author guidelines</a> for formatting details.
            </p>
          </div>
        </div>

        {/* 2. Review Articles */}
        <div className="flex gap-4">
          <div className="flex-shrink-0 w-12 h-12 rounded-full bg-slate-900 text-white flex items-center justify-center text-xl font-bold">2</div>
          <div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Review Articles</h3>
            <p className="text-gray-700 mb-4">
              Review Articles should provide a critical and comprehensive synthesis of existing literature relevant to sociology.
            </p>
            <ul className="list-disc pl-5 space-y-1 text-gray-700">
              <li>May include systematic reviews, meta-analyses, or narrative reviews</li>
              <li>Must clearly describe the review methodology and data sources</li>
              <li>Should identify research gaps, theoretical debates, and future directions</li>
              <li>Typical length: up to 5,000 words, including references, tables, and figures</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ArticleTypes;