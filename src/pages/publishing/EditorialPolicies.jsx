import React from 'react';
import { HeroImage } from '../../components/ui/PublishingComponents';
import editorialImg from '../../assets/images/Editorial Policies.webp';

export default function EditorialPolicies() {
  return (
    <div className="pb-20 animate-in fade-in duration-700">
      <HeroImage 
        src={editorialImg} 
        alt="Editorial Policies" 
      />

      <h1 className="text-[32px] font-black text-gray-900 mb-6 font-serif leading-tight">
        Editorial Policies
      </h1>

      <p className="text-gray-600 text-[15px] leading-relaxed mb-10">
        The editorial policies of the Jadetimes Journal of Universal Studies ensure fairness, transparency, and academic integrity in all editorial and peer review decisions.
      </p>

      <div className="space-y-12">
        <section>
          <h2 className="text-[22px] font-black text-gray-900 mb-6 font-serif">Editorial Policies and Peer Review Process</h2>
          
          <div className="space-y-8">
            <div className="space-y-3">
              <h3 className="text-lg font-bold text-gray-900">Editorial Assessment</h3>
              <p className="text-gray-600 text-[15px] leading-relaxed">
                All manuscripts submitted to the <span className="uppercase text-blue-600 font-semibold">Jadetimes JOURNAL OF UNIVERSAL STUDIES (JJUS)</span> are initially evaluated by the Editors to determine their suitability for further processing.
              </p>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-bold text-gray-900">Primary Editorial Assessment (Desk Review)</h3>
              <p className="text-gray-600 text-[15px] leading-relaxed">
                A Desk Rejection / Primary Editorial Rejection will be applied to manuscripts that:
              </p>
              <ul className="space-y-3 pl-5 list-disc text-gray-600 text-[15px]">
                <li>Fall outside the scope of the journal</li>
                <li>Do not comply with the Author Guidelines</li>
                <li>Fail to meet minimum academic, ethical, or language standards</li>
              </ul>
              <p className="text-gray-600 text-[15px] pt-2">
                Manuscripts rejected at this stage will not proceed to peer review.
              </p>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-bold text-gray-900">Double-Blind Peer Review</h3>
              <p className="text-gray-600 text-[15px] leading-relaxed">
                Manuscripts approved for further processing are subjected to a double-blind peer review process, in which the identities of both authors and reviewers are concealed. Each manuscript is reviewed by:
              </p>
              <ul className="space-y-3 pl-5 list-disc text-gray-600 text-[15px]">
                <li>Two members of the Editorial Board, and</li>
                <li>Two independent External Reviewers from the journal's panel of reviewers</li>
              </ul>
              <p className="text-gray-600 text-[15px] pt-2">
                Where methodological or analytical expertise is required, the manuscript may also be referred to an additional specialist reviewer.
              </p>
            </div>

            <div className="space-y-3">
              <h3 className="text-lg font-bold text-gray-900">Reviewer Disagreement</h3>
              <p className="text-gray-600 text-[15px] leading-relaxed">
                In cases where significant disagreement arises among reviewers, the manuscript will be <span className="font-bold underline">forwarded to another independent reviewer for further evaluation</span>.
              </p>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-bold text-gray-900">Editorial Decision</h3>
              <p className="text-gray-600 text-[15px] leading-relaxed">
                Reviewer reports and recommendations are evaluated by the Editors. The final decision regarding acceptance, revision, or rejection rests solely with the Editors of the journal. Decisions are based on:
              </p>
              <ul className="space-y-3 pl-5 list-disc text-gray-600 text-[15px]">
                <li>Scholarly originality and contribution to sociology</li>
                <li>Theoretical grounding and methodological rigor</li>
                <li>Ethical compliance</li>
                <li>Clarity and academic relevance</li>
              </ul>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-bold text-gray-900">Review Timeline</h3>
              <p className="text-gray-600 text-[15px] leading-relaxed">
                The journal aims to complete the peer review process and communicate an editorial decision within two months from the date of submission. This timeline may vary depending on:
              </p>
              <ul className="space-y-3 pl-5 list-disc text-gray-600 text-[15px]">
                <li>The submission date within the editorial cycle</li>
                <li>Reviewer availability and response time</li>
                <li>The extent of revisions required</li>
                <li>The promptness of author responses</li>
              </ul>
              <p className="text-gray-600 text-[15px] pt-2">
                Authors are kindly requested to refrain from sending status enquiry emails unless at least two months have elapsed since the date of submission. Excessive correspondence during the review period may interfere with the editorial workflow.
              </p>
            </div>

            <div className="space-y-4 pt-4">
              <h3 className="text-lg font-bold text-gray-900">Revisions and Resubmission</h3>
              <ul className="space-y-3 pl-5 list-disc text-gray-600 text-[15px]">
                <li>Failure to resubmit within this period will result in rejection and archiving of the manuscript.</li>
                <li>Revised manuscripts should be accompanied by a response explaining how reviewer comments have been addressed.</li>
              </ul>
            </div>

            <div className="space-y-4 pt-4">
              <h3 className="text-lg font-bold text-gray-900">Ethical Oversight</h3>
              <p className="text-gray-600 text-[15px] leading-relaxed">
                All editorial decisions and peer review procedures are conducted in accordance with the journal's Publication Ethics and Malpractice Statement. For a comprehensive description of ethical standards and editorial responsibilities, authors and reviewers are advised to refer to the Research Integrity section of the journal website.
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
