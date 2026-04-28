import React from 'react';
import { HeroImage, InfoBox } from '../../components/ui/PublishingComponents';
import authorImg from '../../assets/images/author guidlines.webp';

export default function AuthorGuidelines() {
  return (
    <div className="pb-20 animate-in fade-in duration-700">
      <HeroImage 
        src={authorImg} 
        alt="Submission Guidelines and Instructions to Authors" 
      />

      <h1 className="text-[32px] font-black text-gray-900 mb-6 font-serif leading-tight">
        Submission Guidelines and Instructions to Authors
      </h1>

      <p className="text-gray-600 text-[15px] leading-relaxed mb-10">
        The Editors of the Jadetimes Journal of Universal Studies (JJUS) cordially invite potential authors to carefully read several of the articles published in the journal in order to obtain a clear understanding of the scope, academic style, methodical focus, and presentation standards expected of manuscripts submitted for publication.
      </p>

      <div className="space-y-4">
        <InfoBox title="Submission of Manuscripts">
          <p>All manuscripts intended for publication in Jadetimes Journal of Universal Studies must be submitted <span className="font-bold underline decoration-blue-500">only through the electronic submission system available on the journal website</span>. The electronic submission system is the <span className="font-bold underline">ONLY acceptable means</span> for manuscript submission. Submissions by e-mail or on paper will not be accepted and will be considered.</p>
        </InfoBox>

        <InfoBox title="Journal Policies and Ethics">
          <p>The journal is committed to the <span className="font-bold underline">Publication Ethics, Publication Malpractice Statement, and Research Integrity Policy</span>. Authors are required to declare that research work submitted to the journal is original, (JJUS) follows internationally accepted ethical standards in scholarly publishing and adheres to the guidelines of COPE and IFMIE in registration of clinical trials in medical journals.</p>
        </InfoBox>

        <InfoBox title="Language Requirements">
          <p>All manuscripts must be written in <span className="font-bold underline">English (UK)</span> (Native speakers are strongly advised to):</p>
          <ul className="space-y-2 mt-3 list-disc pl-5">
            <li>Read the manuscript several times before submission.</li>
            <li>Read the translation thoroughly as academic platform in US English.</li>
          </ul>
          <p className="mt-3 italic">The Editorial Board will not review any article language, typographic, or structural errors. Any submissions that do not meet acceptable language standards will be <span className="font-bold underline">rejected without further processing</span>.</p>
        </InfoBox>

        <InfoBox title="Submission Charges">
          <ul className="space-y-1 list-disc pl-5">
            <li>There are <span className="font-bold underline">NO submission fees</span></li>
            <li>There are <span className="font-bold underline">NO processing or review fees</span></li>
            <li>There are <span className="font-bold underline">NO publication fees</span></li>
          </ul>
          <p className="mt-3 font-bold">The Journal operates on a fully open access, no-fee publishing model.</p>
        </InfoBox>

        <InfoBox title="Important Stipulation">
          <p>Accepted manuscripts will be placed in a publication queue and published strictly according to the <span className="font-bold underline">chronological order of acceptance</span>. This system ensures equity, impartiality, and fairness to all authors. The Journal does not maintain an upgrade to expedite publication, as this violates the commitment to maintain scientific and academic integrity and fairness of finalisation of final results.</p>
        </InfoBox>

        <InfoBox title="General Instructions">
          <p>All studies involving human participants must clearly state that ethics approval was obtained from an appropriate Institutional Review Committee, whereas appropriate. If human participants must have an understanding informed consent statement, research involving vulnerable populations bears additional responsibility for the ethical treatment of research subjects.</p>
        </InfoBox>

        <InfoBox title="Manuscript Preparation">
          <ul className="space-y-2 list-disc pl-5">
            <li>Manuscripts must be submitted in <span className="font-bold underline">Microsoft Word only</span></li>
            <li>(DOC format only) should not be used for any font.</li>
            <li>Please use plain, simple styling fonts, and avoid unnecessary layout and format as this will slow down the process.</li>
          </ul>
        </InfoBox>

        <InfoBox title="Formatting Requirements">
          <ul className="space-y-2 list-disc pl-5">
            <li>Line 1: Use 12pt Times New Roman</li>
            <li>Line spacing: 1.5</li>
            <li>Margins: Normal (All corners) at least</li>
            <li>Single column layout</li>
          </ul>
          <p className="mt-3 italic">Submissions not conforming to these requirements will be <span className="font-bold underline">returned to authors</span>.</p>
        </InfoBox>

        <InfoBox title="Cover Letter">
          <p>A covering letter should accompany every manuscript submission and should include:</p>
          <ul className="space-y-2 list-disc pl-5 mt-2">
            <li>Brief description of the manuscript's findings and why they are significant to the field</li>
            <li>A declaration that the manuscript is original and has not been published previously</li>
            <li>A statement that research was conducted in accordance with ethical guidelines</li>
            <li>Full contact details of the corresponding author (Mobile, phone, email)</li>
            <li>Details of funding or financial support</li>
            <li>A statement confirming ethics approval where applicable</li>
          </ul>
        </InfoBox>

        <InfoBox title="Criteria for Authorship">
          <p>All those designated as authors should qualify for authorship, based on several key criteria:</p>
          <ol className="list-decimal pl-5 mt-3 space-y-2">
            <li>Substantial contribution to research design, data collection, or research analysis.</li>
            <li>Drafting the article, revising it for critical content.</li>
            <li>Final agreement for the version to be published.</li>
            <li>Agreement to be accountable for the work.</li>
          </ol>
          <p className="mt-3 italic">Ghost, gift, and guest authorship are <span className="font-bold underline">strictly prohibited</span>.</p>
        </InfoBox>

        <InfoBox title="ORCID Requirement">
          <p>All authors are required to provide an <span className="font-bold underline uppercase">ORCID ID</span> at the time of submission.</p>
        </InfoBox>

        <InfoBox title="Review Process">
          <p>All submitted manuscripts undergo an initial internal screening procedure. Manuscripts that follow basic criteria are submitted to a <span className="font-bold underline uppercase">Double-Blind Peer Review Process</span> involving at least two qualified external reviewers who have absolute control of technicality and the safety of the manuscript. The Jadetimes International JOURNAL maintains full independence between the manuscript review, test, and technical trial.</p>
        </InfoBox>

        <InfoBox title="Types of Articles Accepted">
          <ul className="space-y-3 list-disc pl-5">
            <li><span className="font-bold">Original Research Articles</span>: Full-length reports of research that represents original and major contribution.</li>
            <li><span className="font-bold">Review Articles</span>: Authoritative review and synthesis of highly research, status, trends and data.</li>
            <li><span className="font-bold">Short Reports</span>: Main text counts counts research findings on focussed insights.</li>
            <li><span className="font-bold">Book Reviews</span>: Concise formal reaction approved from (JJUS) Editor.</li>
          </ul>
        </InfoBox>

        <InfoBox title="Abstract and Keywords">
          <p>All manuscripts must include an appropriately structured abstract (Max 250 words) including Background, Objectives, Methods, Results, and Findings, and conclusions include 5-7 keywords separated by commas.</p>
        </InfoBox>

        <InfoBox title="References">
          <p>All references must follow <span className="font-bold underline">APA 7th Edition style</span>. References must be reviewed and accurate scientifically. DOIs should be included where available.</p>
        </InfoBox>

        <InfoBox title="Plagiarism">
          <p>The Journal maintains <span className="font-bold">zero tolerance</span> for plagiarism. All submitted work is checked for plagiarism by checking manuscripts against the world's scholarly databases and scientific data.</p>
        </InfoBox>

        <InfoBox title="Copyright and Licensing">
          <p>Authors which publish in the JJUS retain copyright and grant the Journal a non-exclusive license to publish the article as a published under a <span className="font-bold">Creative Commons Attribution 4.0 International license (CC BY 4.0)</span>.</p>
        </InfoBox>

        <InfoBox title="Privacy Statement">
          <p>Names and email addresses collected will be used exclusively for the stated objectives of the journal and will not shared with third parties.</p>
        </InfoBox>
      </div>
    </div>
  );
}