import React from 'react';
import { Link } from 'react-router-dom';

const SubmissionChecklist = () => {
  return (
    <div className="text-gray-800">
      <h1 className="text-4xl font-semibold mb-6">Submission checklist</h1>

      <h2 className="text-2xl font-semibold mb-4 mt-8">Getting started</h2>

      <ul className="list-disc ml-6 space-y-4 text-md text-gray-700">
        <li>
          The submitting and corresponding author(s) must{' '}
          <Link to="/register" className="text-green-600 hover:text-green-800 hover:underline">
            register and log in with Frontiers
          </Link>{' '}
          to be able<br /> to follow the review process.
        </li>
        <li>
          Ensure that your manuscript fits the scope of the journal/section/Research Topic in which it will<br />
          be submitted and that you have chosen the correct article type. Submission of the wrong<br />
          article type or to a specialty that does not match the scope of your manuscript will result in<br />
          delays and potentially rejection. For additional details about article types and manuscript<br />
          guidelines, visit our{' '}
          <Link to="/publishing/author-guidelines" className="text-green-600 hover:text-green-800 hover:underline">
            author guidelines
          </Link>{' '}
          and journal pages.
        </li>
        <li>
          During submission, the submitting author will be required to answer questions regarding the<br />
          manuscript and research, as well as provide information and consent for all authors. Below is a<br />
          checklist detailing the information that will be required.
        </li>
      </ul>

      <p className="mt-6 text-md text-gray-700">
        The following is mandatory when submitting to Frontiers.
      </p>

      <h2 className="text-2xl font-semibold mb-4 mt-10">Author information</h2>

      <div className="space-y-4 text-md text-gray-700">
        <p>
          a) All authors listed on the manuscript must be added in the relevant tab during submission. Please<br />
          have ready the names, emails, and affiliations of all the authors, and ensure the authors all
          <Link to="/publishing/author-guidelines" className="text-green-600 hover:text-green-800 hover:underline">
            {' '}qualify<br /> for authorship
          </Link>.
        </p>
        <p>
          b) During submission, you will be requested to provide an author(s) contribution statement briefly<br />
          describing the tasks of all individual authors.
        </p>
      </div>

      <h2 className="text-2xl font-semibold mb-4 mt-10">File requirements</h2>
      <div className="space-y-4 text-md text-gray-700">
        <p>
          a) A manuscript PDF file generated from the submitted manuscript, and the source file. For LaTeX<br />
          only: The BIB file if the references were not included in the TEX.
        </p>
        <p>
          b) All figures in TIFF or JPEG formats, RGB color mode, with a resolution of 300 dpi, and<br />
          complying with <Link to="#" className="text-green-600 hover:text-green-800 hover:underline"> {' '}CC-BY licence</Link>.
        </p>
        <p>
          Permissions need to be obtained for re-published/adapted/modified/partial figures, and it is the<br />
          responsibility of the authors to acquire the licenses, to follow any citation instructions requested<br />
          by third-party rights holders, and cover any supplementary charges. Uploaded figures will be<br />
          embedded at the end of the submitted manuscript. See  <Link to="#" className="text-green-600 hover:text-green-800 hover:underline"> {' '}here </Link>for more information.
        </p>
        <p>
          c) Tables should be directly inserted into the manuscript and in source form (doc, tex), not as<br />
          figures. You should prepare the files accordingly.
        </p>
      </div>

      <h2 className="text-2xl font-semibold mb-4 mt-10">Statements</h2>
      <div className="space-y-4 text-md text-gray-700">
        <p>
          a ) Please ensure that the relevant <Link to="#" className="text-green-600 hover:text-green-800 hover:underline">
            {' '}ethical approval and consent details</Link> were received and are<br />
          available on request by the editor or editorial office. You will be requested to declare involvement<br />
          of any human or animal subjects, and inclusion of identifiable human data for the research during<br />
          the submission process; declaration statements will be generated and automatically added to your<br />
          manuscript. You do not need to include these statements in your source file.
        </p>
        <p>
          b) Frontiers requires some types of data to be provide in manuscripts or <Link to="#" className="text-green-600 hover:text-green-800 hover:underline">
            {' '}deposited in public,<br />
            community-supported repositories</Link>, prior to publication of an associated Frontiers manuscript.
        </p>
        <p>
          During submission, you will be requested to reply to a series of questions on the availability of the<br />
          data used for the research. Based on your answers, a <Link to="#" className="text-green-600 hover:text-green-800 hover:underline">
            {' '}data availability</Link> statement will be generated<br />
          and added to your manuscript. You therefore do not need to include a data statement in your<br />
          source file.
        </p>
      </div>

      <h2 className="text-2xl font-semibold mb-4 mt-10">Contribution to the field</h2>
      <div className="space-y-4 text-md text-gray-700">
        <p>
          Ahead of submission, you should prepare a <Link to="#" className="text-green-600 hover:text-green-800 hover:underline">
            {' '}statement</Link> summarizing in 200 words your<br />
          manuscript’s contribution to, and position in, the existing literature of your field. This should be<br />
          written avoiding any technical language or non-standard acronyms. The aim should be to convey<br />
          the meaning and importance of this research to a non-expert. (Note that you will NOT be able to<br />
          provide a traditional cover letter.)
        </p>
      </div>

      <h2 className="text-2xl font-semibold mb-4 mt-10">Funding and payment</h2>
      <div className="space-y-4 text-md text-gray-700">
        <p>
          a) Details of all funding sources will be requested during submission and must be provided in a<br />
          funding section of the manuscript, including grant numbers, if applicable. You should also mention<br />
          funds received for open access publication fees, from your institution, library, or other grants.
        </p>
        <p>
          b) Prepare details ahead of submission on whom the invoice needs to be addressed to. If you are<br />
          affiliated with a <Link to="#" className="text-green-600 hover:text-green-800 hover:underline">
            {' '}member institution</Link>, you will be able to select the institution in the submission<br />
          system payment tile.
        </p>
      </div>
    </div>
  );
};

export default SubmissionChecklist;