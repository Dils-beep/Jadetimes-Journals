import React from 'react';
import { Link } from 'react-router-dom';

const JournalSubmissionInfo = () => {
  return (
    <>
      {/* Why submit? Section */}
      <section className="mb-10">
        <h1 className="text-4xl font-semibold text-gray-900 mb-10">
          Why submit?
        </h1>

        <p className="text-gray-700 text-md mb-4">
          Frontiers’ journals were purposely designed to address many of the issues that authors face in<br />
          traditional publishing models.
        </p>
        <p className="text-gray-700 text-md mb-20">
          Fairness of review, speed of publication, and widespread visibility are just a few of the benefits<br />
          available for Frontiers’ authors.
        </p>
      </section>

      {/* Fast, transparent review Section */}
      <section className="mb-10">
        <h2 className="text-3xl font-semibold text-gray-900 mb-10">
          Fast, transparent review
        </h2>

        <p className="text-gray-700 text-md mb-6">
          All articles submitted to Frontiers are subjected to review without selection bias. Our{' '}
          <Link to="/publishing/peer-review" className="text-green-600 hover:text-green-700 hover:underline font-semibold">
            peer <br /> review system
          </Link>{' '}
          is unbiased, efficient and transparent.
        </p>

        {/* List of Benefits */}
        <ul className="list-none space-y-2 pl-0">
          <li className="flex items-start text-gray-700 text-md before:content-['•'] before:text-black-600 before:mr-3 before:text-2xl before:leading-none">
            An average of 90 days from submission to acceptance due to our innovative collaborative<br />
            review forum
          </li>

          <li className="flex items-start text-gray-700 text-md before:content-['•'] before:text-black-600 before:mr-3 before:text-2xl before:leading-none">
            Only the top researchers in your field are admitted to our editorial boards to ensure that the<br />
            peer review adds value to your research
          </li>

          <li className="flex items-start text-gray-700 text-md before:content-['•'] before:text-black-600 before:mr-3 before:text-2xl before:leading-none">
            Our review template ensures that the review process is comprehensive and objective
          </li>

          <li className="flex items-start text-gray-700 text-md before:content-['•'] before:text-black-600 before:mr-3 before:text-2xl before:leading-none">
            Real-time interaction between the author and reviewers speeds up the review process enabling<br />
            research findings to be published timely.
          </li>

          <li className="flex items-start text-gray-700 text-md before:content-['•'] before:text-black-600 before:mr-3 before:text-2xl before:leading-none">
            The community reviewers' identities, which remain confidential throughout the review process,<br />
            are revealed upon article publication and the reviewers are acknowledged for their contribution<br />
            to the publication.
          </li>
        </ul>
      </section>
    </>
  );
};

export default JournalSubmissionInfo;