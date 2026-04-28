import React from 'react';
import { Link } from 'react-router-dom';

const JournalSubmissionBenefits = () => {
  return (
    <>
      {/* Rapid publication Section */}
      <section className="mb-10">
        <h2 className="text-3xl font-semibold text-gray-900 mb-10">
          Rapid publication
        </h2>

        <p className="text-gray-700 text-md mb-20">
          Authors can quickly claim their discovery through rapid paper pending abstract publications.<br />
          Articles are available immediately after publication so other researchers can build on the findings<br />
          without delays, speeding up scientific progress. An average of 12 days from acceptance until the<br />
          final typeset document.
        </p>
      </section>

      {/* Article impact Section */}
      <section>
        <h2 className="text-3xl font-semibold text-gray-900 mb-10">
          Article impact
        </h2>

        <p className="text-gray-700 text-md mb-4">
          Our innovative tools and solutions raise the visibility and impact of research so more people can<br />
          benefit from your discoveries.
        </p>

        <p className="text-gray-700 text-md mb-6">
          Our suite of impact metrics provides the most advanced feedback available in terms of article<br />
          readership, citation statistics, comment posting and ratings. Authors may follow the impact of their<br />
          published articles via this unprecedented set of analytics tools. These data are then translated into<br />
          powerful indicators regarding the academic excellence and social relevance of each research<br />
          work.
        </p>

        <Link to="#" className="text-green-600 hover:text-green-700 hover:underline font-semibold text-md inline-block pt-2">
          Read more about our impact.
        </Link>
      </section>
    </>
  );
};

export default JournalSubmissionBenefits;