import React from 'react';
import { Link } from 'react-router-dom';

const JournalSubmissionPromotion = () => {
  return (
    <>
      {/* Article promotion Section */}
      <section className="mb-10">
        <h2 className="text-3xl font-semibold text-gray-900 mb-8">
          Article promotion
        </h2>

        <p className="text-gray-700 text-md mb-20">
          Articles are widely promoted through email alerts and, when appropriate, press releases, further<br />
          increasing the accessibility and spreading of every research work.
        </p>
      </section>

      {/* Top researchers as editors Section */}
      <section className="mb-10">
        <h2 className="text-3xl font-semibold text-gray-900 mb-8">
          Top researchers as editors
        </h2>

        <p className="text-gray-700 text-md mb-20">
          All appointed members of our editorial boards are selected among the best researchers in their<br />
          areas of expertise. The editors’ efforts in improving the paper during review and their names’<br />
          disclosure on accepted articles contribute certifying that each article is a landmark of the highest<br />
          quality, and therefore increasing the authors’ reputation.
        </p>
      </section>

      {/* Indexing Section */}
      <section>
        <h2 className="text-3xl font-semibold text-gray-900 mb-8">
          Indexing
        </h2>
        <p className="text-gray-700 text-md mb-20">
          Frontiers articles are indexed in a number of major international digital archives and repositories,<br />
          such as PubMed Central, DOAJ, Google Scholar, Chemical Abstracts Service. For additional details<br />
          on specific indexing, please see the individual journals’ About page.
        </p>
      </section>

      {/* Open Access Section */}
      <section>
        <h2 className="text-3xl font-semibold text-gray-900 mb-8">
          Open access
        </h2>

        <p className="text-gray-700 text-md mb-20">
          Frontiers' open access policy ensures high visibility and maximum exposure of your work - anyone<br />
          can read your articles, without paying any access or subscription costs. Your work can be shared<br />
          under the terms of the<Link to="/publishing/open-access" className="text-green-600 hover:text-green-700 hover:underline font-semibold"> Creative Commons Attribution License</Link>. Frontiers submits all its journals<br />
          for archiving in PubMed Central and PubMed, and all publications receive a PMCID as soon as the<br />
          journal is indexed (even retroactively).
        </p>
      </section>


      {/* Copyright retention Section */}
      <section>
        <h2 className="text-3xl font-semibold text-gray-900 mb-8">
          Copyright retention
        </h2>

        <p className="text-gray-700 text-md mb-20">
          Under our <Link to="#" className="text-green-600 hover:text-green-700 hover:underline font-semibold">website terms and conditions</Link> you retain the copyright in your articles (except for any<br />
          third-party images etc). You may in general reproduce copies of your articles in any way you<br />
          choose and freely disseminate these as reprints or electronically, as long as the original publication<br />
          is fully cited. For instance, your published article can (with the full citation) be posted on your<br />
          personal or institutional homepage, emailed to friends and colleagues, printed, archived in a<br />
          collection, distributed on CD-ROM, quoted in the press, translated or distributed in any other way<br />
          to as many people and as often as you wish. All Frontiers articles are Open Access and distributed<br />
          under the terms of the<Link to="/publishing/open-access" className="text-green-600 hover:text-green-700 hover:underline font-semibold"> Creative Commons Attribution License</Link>, which permits the use,<br />
          distribution, and reproduction in other forums, provided the original authors and source are<br />
          credited.
        </p>
      </section>

      {/* Publishing process - step by step */}
      <section>
        <h2 className="text-3xl font-semibold text-gray-900 mb-8">
          Publishing process - step by step
        </h2>

        <h6 className="text-3xl font-semibold text-gray-900 mb-6 flex items-center">
          <span className="text-5xl font-bold mr-3">1.</span> Preparation
        </h6>

        <p className="text-gray-700 text-md mb-12">
          Format the manuscript to be submitted according to our <Link to="/publishing/author-guidelines" className="text-green-600 hover:text-green-700 hover:underline font-semibold">author guidelines</Link>.
        </p>

        <h6 className="text-3xl font-semibold text-gray-900 mb-6 flex items-center">
          <span className="text-5xl font-bold mr-3">2.</span> Registration
        </h6>

        <p className="text-gray-700 text-md mb-12">
          <Link to="/register" className="text-green-600 hover:text-green-700 hover:underline font-semibold">Register</Link> yourself with Frontiers and <Link to="/login" className="text-green-600 hover:text-green-700 hover:underline font-semibold">log in </Link>to start submission.
        </p>

        <h6 className="text-3xl font-semibold text-gray-900 mb-6 flex items-center">
          <span className="text-5xl font-bold mr-3">3.</span> Submission
        </h6>

        <p className="text-gray-700 text-md mb-12">
          Submit your manuscript through the Frontiers <Link to="/publishing/why-submit" className="text-green-600 hover:text-green-700 hover:underline font-semibold">
            submission</Link> pages, where you are required to select<br /> the specialty which best covers your research area as well as one associate editor. </p>

        <h6 className="text-3xl font-semibold text-gray-900 mb-6 flex items-center">
          <span className="text-5xl font-bold mr-3">4.</span> Review
        </h6>

        <p className="text-gray-700 text-md mb-12">
          Once the community reviewers have submitted their independent review reports, you are notified<br />
          that the interactive review forum is active. According to our<Link to="/publishing/peer-review" className="text-green-600 hover:text-green-700 hover:underline font-semibold"> review guidelines </Link>you are now able to<br />
          interact with the reviewers in the forum and also re-submit a new manuscript if necessary. </p>


        <h6 className="text-3xl font-semibold text-gray-900 mb-6 flex items-center">
          <span className="text-5xl font-bold mr-3">5.</span> Acceptance or rejection
        </h6>

        <p className="text-gray-700 text-md mb-12">
          Upon finalization of the review, the editorial decision is taken and you immediately receive notification. </p>

        <h6 className="text-3xl font-semibold text-gray-900 mb-6 flex items-center">
          <span className="text-5xl font-bold mr-3">6.</span> Publication fees
        </h6>

        <p className="text-gray-700 text-md mb-12">
          Congratulations, your article was accepted. You are now required to pay an article processing fee,<br />
          if needed. Rejected articles are not charged any fees. </p>

        <h6 className="text-3xl font-semibold text-gray-900 mb-6 flex items-center">
          <span className="text-5xl font-bold mr-3">7.</span> Article production
        </h6>

        <p className="text-gray-700 text-md mb-12">
          Your manuscript layout is adapted according to our style sheet. Proofs will be sent to you to be<br />
          checked and corrected. At this step, you may be asked for higher quality figures if needed. In order<br />
          to prevent a delay in the production process, please make sure that your images, figures and tables<br />
          follow the <Link to="/publishing/author-guidelines" className="text-green-600 hover:text-green-700 hover:underline font-semibold">author guidelines</Link>. For any questions, <Link to="/contact" className="text-green-600 hover:text-green-700 hover:underline font-semibold">contact the production office</Link>. </p>

        <h6 className="text-3xl font-semibold text-gray-900 mb-6 flex items-center">
          <span className="text-5xl font-bold mr-3">8.</span> Publication and indexing
        </h6>

        <p className="text-gray-700 text-md mb-12">
          After production, your article is published electronically in the specialty journal or section, both in<br />
          HTML and PDF formats, and is also submitted to PubMed Central for archiving. </p>

        <h6 className="text-3xl font-semibold text-gray-900 mb-6 flex items-center">
          <span className="text-5xl font-bold mr-3">9.</span> Dynamic impact evaluation
        </h6>

        <p className="text-gray-700 text-md mb-12">
          Your article’s impact is dynamically evaluated while readers browse the pages of Frontiers' platform<br />
          and feed back to the authors. </p>

      </section>
    </>
  );
};

export default JournalSubmissionPromotion;