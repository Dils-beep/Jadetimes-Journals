import React from 'react';

const checklistSections = [
  {
    number: "1",
    title: "Manuscript Eligibility",
    items: [
      "The manuscript falls within the scope of Sociology as defined by the journal",
      "The manuscript is original, has not been published previously, and is not under consideration elsewhere",
      "The correct article type has been selected (Original Research Article or Review Article)"
    ]
  },
  {
    number: "2",
    title: "Author Information",
    items: [
      "All authors are listed correctly in the manuscript and submission system",
      "Full names, institutional affiliations, and email addresses are provided",
      "ORCID iDs are provided for all authors",
      "Authorship meets the journal's authorship criteria",
      "An Author Contributions Statement is included"
    ]
  },
  {
    number: "3",
    title: "Manuscript Preparation",
    items: [
      "The manuscript is prepared in Microsoft Word (.doc or .docx)",
      "Language is English (UK)",
      "Font: Times New Roman | Size: 12 | Line spacing: 1.5",
      "Margins are set to 1 inch (2.54 cm) on all sides",
      "The manuscript is in single-column format",
      "Track changes, comments, and colored text have been removed"
    ]
  },
  {
    number: "4",
    title: "Manuscript Structure",
    items: [
      "Title page includes title, author names, and affiliations",
      "Abstract is included and within the word limit",
      "Keywords (4-6) are provided",
      "Main text follows the journal's recommended structure",
      "Tables and figures are properly numbered and captioned",
      "References are complete and formatted according to the journal's reference style"
    ]
  },
  {
    number: "5",
    title: "Ethical Declarations",
    items: [
      "Ethical approval has been obtained where required",
      "Informed consent has been obtained where applicable",
      "Ethical approval details are stated in the manuscript",
      "Any conflicts of interest are disclosed",
      "Funding sources (if any) are clearly declared"
    ]
  },
  {
    number: "6",
    title: "Data Availability",
    items: [
      "Data used in the study are described clearly",
      "A Data Availability Statement is included, where applicable",
      "Data can be shared upon reasonable request, subject to ethical and legal considerations"
    ]
  },
  {
    number: "7",
    title: "Plagiarism and Originality",
    items: [
      "The manuscript has been screened for plagiarism using Turnitin or equivalent plagiarism-detection software",
      "The overall similarity index is below 7%, excluding references, quotations, and standard methodological descriptions",
      "No single source shows excessive similarity",
      "All reused content is properly cited and referenced",
      "Note: Manuscripts with a similarity index exceeding 7% will be rejected at the editorial screening stage."
    ]
  },
  {
    number: "8",
    title: "Submission Confirmation",
    items: [
      "All authors have reviewed and approved the final manuscript",
      "The corresponding author agrees to act on behalf of all authors during the review process",
      "The manuscript complies fully with the Author Guidelines and Editorial Policies"
    ]
  },
  {
    number: "9",
    title: "Submission Process",
    items: [
      "All manuscripts must be submitted only through the official Jadetimes Journals online submission portal.",
      "Submissions sent by email or any other method will not be considered.",
      "Step 1: Authors are required to register an account on the Jadetimes Journals submission portal.",
      "Step 2: After logging in, click \"New Submission\" and complete the form (Manuscript info, Author details, Declarations, Upload file)."
    ]
  },
  {
    number: "10",
    title: "Initial Editorial Assessment (Within 7 Days)",
    description: "Our editorial team will conduct an initial screening within 7 days to check:",
    items: [
      "Scope alignment",
      "Formatting and guideline compliance",
      "Plagiarism threshold",
      "Ethical declarations"
    ]
  },
  {
    number: "11",
    title: "Peer Review Process (Up to 2 Weeks)",
    items: [
      "Manuscripts that pass the initial assessment will be sent to the double-blind peer review process.",
      "The peer review process typically takes up to 2 weeks.",
      "Authors will be informed whether the manuscript is accepted, requires revision, or is rejected within this period."
    ]
  },
  {
    number: "12",
    title: "Revision (if required)",
    items: [
      "If revisions are requested, authors must address all reviewer comments and provide a point-by-point response.",
      "Revised manuscripts should be submitted within the specified timeframe."
    ]
  },
  {
    number: "13",
    title: "Final Decision and Publication",
    items: [
      "Once accepted, authors will be formally notified.",
      "The article will proceed to final editing and publication online under the journal's open-access policy."
    ]
  }
];

export default function SubmissionChecklistPage() {
  return (
    <div className="animate-in fade-in duration-700">
      <h1 className="text-4xl font-black text-gray-900 mb-8 font-serif">Submission Checklist</h1>

      <section className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-4 font-serif">Submission Process</h2>
        <p className="text-gray-600 leading-relaxed">
          Before submitting a manuscript to the Jadetimes Journal of Universal Studies (JJUS), authors must ensure that all the following requirements have been met. Submissions that do not comply with this checklist may be subject to desk rejection or delays in processing.
        </p>
      </section>

      <div className="space-y-12">
        {checklistSections.map((section) => (
          <section key={section.number} className="relative">
            <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-3">
              <span className="font-serif">{section.number}.</span> {section.title}
            </h3>
            {section.description && (
              <p className="text-gray-600 mb-4 text-[15px]">{section.description}</p>
            )}
            <ul className="space-y-3">
              {section.items.map((item, idx) => (
                <li key={idx} className="flex items-start gap-3 text-[15px] text-gray-600 leading-relaxed">
                  <span className="text-blue-500 mt-1.5 shrink-0">•</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>

      <div className="mt-16 bg-blue-50/50 border-l-4 border-blue-600 p-6 rounded-r-lg">
        <p className="text-gray-800 font-bold text-[15px]">
          Important Note: All communication regarding submission status, revisions, and decisions will be conducted through the Jadetimes Journals portal and registered email address.
        </p>
      </div>
    </div>
  );
}