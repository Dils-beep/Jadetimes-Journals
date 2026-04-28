export default function ResearchIntegrityPage() {
  const sections = [
    {
      title: "1. Publication Ethics",
      content: "JJUS publishes only original scholarly work. The journal does not tolerate unethical practices such as plagiarism, data fabrication, falsification, duplicate submission, or improper authorship."
    },
    {
      title: "2. Plagiarism Policy",
      content: "All manuscripts are screened using Turnitin. JJUS accepts manuscripts with a similarity index of 7% or below (excluding references/quotes). Manuscripts exceeding this threshold are rejected.",
      bullets: [
        "All manuscripts are screened using Turnitin.",
        "JJUS accepts manuscripts with a similarity index of 7% or below (excluding references/quotes).",
        "Manuscripts exceeding this threshold are rejected."
      ]
    },
    {
      title: "3. Authorship and Contribution",
      content: "Authorship must reflect substantial intellectual contribution. All listed authors must meet authorship criteria, and all those who contributed substantially should be listed."
    },
    {
      title: "4. Data Integrity and Reproducibility",
      content: "Authors must represent data accurately. Raw data should be available for review upon request. Image manipulation that alters scientific meaning is prohibited."
    },
    {
      title: "5. Conflicts of Interest",
      content: "All authors, reviewers, and editors must disclose any financial or non-financial conflicts of interest."
    },
    {
      title: "6. Ethical Oversight",
      content: "Studies involving human participants require ethical approval and informed consent. Research involving vulnerable populations requires strict ethical compliance."
    },
    {
      title: "7. Peer Review Integrity",
      content: "JJUS is committed to a fair and unbiased peer review process. Peer review is conducted blindly to ensure objectivity and merit-based evaluation."
    },
    {
      title: "8. Corrections and Retractions",
      content: "The journal handles corrections and retractions in accordance with COPE guidelines to maintain the integrity of the scholarly record.",
      bullets: [
        "Corrections: Issued for honest errors that do not invalidate findings.",
        "Retractions: Issued for serious misconduct or unreliable data.",
        "Expressions of Concern: Published when investigations are ongoing."
      ]
    },
    {
      title: "9. Misconduct Handling",
      content: "Allegations of misconduct are investigated confidentially. The journal reserves the right to reject, retract, or report misconduct where necessary."
    }
  ];

  return (
    <div className="animate-in fade-in duration-700">
      <h1 className="text-4xl font-bold text-gray-900 mb-6">Research Integrity</h1>
        <p className="text-gray-600 text-[17px] leading-relaxed mb-10">
          The Jadetimes Journal of Universal Studies (JJUS) is committed to maintaining the highest standards of research integrity, publication ethics, and academic responsibility.
        </p>

        <div className="space-y-10">
          {sections.map((section, idx) => (
            <section key={idx} className="space-y-4">
              <h2 className="text-xl font-bold text-gray-900">
                {section.title}
              </h2>
              <p className="text-gray-600 leading-relaxed text-[15px]">
                {section.content}
              </p>
              {section.bullets && (
                <ul className="list-disc pl-5 space-y-2 mt-2 text-[15px] text-gray-600">
                  {section.bullets.map((bullet, bIdx) => (
                    <li key={bIdx}>{bullet}</li>
                  ))}
                </ul>
              )}
            </section>
          ))}
        </div>
      </div>
  );
}
