import React from 'react';

export default function CopyrightStatementPage() {
  const processItems = [
    "Author Ownership: Authors retain full copyright and grant Jadetimes Journal of Universal Studies (JJUS) a non-exclusive license to publish the work.",
    "Licensing: All published articles are made available under the Creative Commons Attribution 4.0 International License (CC BY 4.0).",
    "Reuse and Distribution: Third parties are free to share, adapt, and build upon the work, provided proper credit is given to the original author(s) and source.",
    "Copyright Declaration Form: Authors are required to sign a declaration confirming originality and agreement to the licensing terms upon acceptance."
  ];

  return (
    <div className="animate-in fade-in duration-700">
      <h1 className="text-4xl font-bold text-gray-900 mb-10">Copyright Statement</h1>

      <div className="space-y-12">
        <section className="space-y-4">
          <h2 className="text-xl font-bold text-gray-900">Copyright Ownership</h2>
          <p className="text-gray-600 leading-relaxed text-[15px]">
            Copyright of all articles published in the Jadetimes Journal of Universal Studies (JJUS) is retained by the author(s). Authors grant Jadetimes International Journals a license to publish the article and identify itself as the original publisher.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-xl font-bold text-gray-900">Licensing</h2>
          <p className="text-gray-600 leading-relaxed text-[15px]">
            All published articles are made available under the Creative Commons Attribution 4.0 International License (CC BY 4.0). This license allows for broad dissemination and reuse of scholarly work, ensuring that sociological research remains accessible to the global academic community.
          </p>
        </section>

        <section className="space-y-6">
          <h2 className="text-xl font-bold text-gray-900">Copyright and Licensing Process</h2>
          <ul className="space-y-4">
            {processItems.map((item, idx) => {
              const [title, rest] = item.split(': ');
              return (
                <li key={idx} className="flex flex-col sm:flex-row sm:items-start text-[15px]">
                  <span className="font-bold text-gray-900 w-full sm:w-1/3 shrink-0 mb-1 sm:mb-0">
                    • {title}:
                  </span>
                  <span className="text-gray-700 sm:w-2/3">
                    {rest}
                  </span>
                </li>
              );
            })}
          </ul>
        </section>
      </div>
    </div>
  );
}
