export default function FactsPage() {
  const sections = [
    {
      title: "Journal Information",
      items: [
        { label: "Journal Title", value: "Jadetimes Journal of Universal Studies (JJUS)" },
        { label: "Discipline", value: "Sociology" },
        { label: "ISSN", value: "3066-9421" },
        { label: "Publisher", value: "Jadetimes International Journals" },
        { label: "Publication Model", value: "Open Access" },
        { label: "Language", value: "English (UK)" },
        { label: "Publication Frequency", value: "Quarterly" },
      ]
    },
    {
      title: "Editorial & Review",
      items: [
        { label: "Peer Review Model", value: "Double-blind peer review" },
        { label: "Initial Editorial Decision", value: "Within 7 days" },
        { label: "Peer Review Duration", value: "Approximately 2 weeks" },
        { label: "Plagiarism Threshold", value: "≤ 7% (Turnitin similarity report)" },
      ]
    },
    {
      title: "Submission & Publication",
      items: [
        { label: "Submission Method", value: "Online submission via Jadetimes Journals portal" },
        { label: "Article Types Accepted", value: "Original Research Articles, Review Articles" },
        { label: "Publication Fees", value: "No submission or publication charges" },
      ]
    },
    {
      title: "Indexing & Visibility",
      items: [
        { label: "Indexing Status", value: "Google Scholar (in progress/available), Scopus (under preparation/available)" },
      ]
    },
    {
      title: "Ethics & Integrity",
      items: [
        { label: "Ethics Policy", value: "COPE-aligned publication ethics" },
        { label: "Plagiarism Policy", value: "Zero tolerance beyond accepted threshold" },
        { label: "Data Policy", value: "Data sharing upon reasonable request" },
      ]
    }
  ];

  return (
    <div className="animate-in fade-in duration-700">
      <h1 className="text-4xl font-bold text-gray-900 mb-10">Facts</h1>

        <div className="space-y-12">
          {sections.map((section, idx) => (
            <section key={idx}>
              <h2 className="text-xl font-bold text-gray-900 mb-6">{section.title}</h2>
              <ul className="space-y-4">
                {section.items.map((item, i) => (
                  <li key={i} className="flex flex-col sm:flex-row sm:items-start text-[15px]">
                    <span className="font-bold text-gray-900 w-full sm:w-1/3 shrink-0 mb-1 sm:mb-0">
                      • {item.label}:
                    </span>
                    <span className="text-gray-700 sm:w-2/3">
                      {item.value}
                    </span>
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </div>
      </div>
  );
}
