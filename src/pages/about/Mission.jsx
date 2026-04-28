export default function Mission() {
  return (
    <div className="animate-in fade-in duration-700">
      <div className="text-center mb-16">
        <h1 className="text-5xl font-bold text-gray-900 mb-4">Our Mission</h1>
        <p className="text-xl text-gray-500 font-medium">
          Making science open for a healthy planet.
        </p>
      </div>

      <section className="mb-16">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Mission</h2>
        <div className="space-y-6 text-gray-700 text-[17px] leading-relaxed">
          <p>
            The Jadetimes Journal of Universal Studies (JJUS) is committed to advancing high-quality sociological scholarship through ethical, transparent, and researcher-focused academic publishing.
          </p>
          <p>
            Our mission is to provide a rigorous platform for the dissemination of original research and critical reviews that deepen understanding of social structures, institutions, relationships, and contemporary social challenges. We aim to support scholarly inquiry by upholding the highest standards of academic integrity, peer review, and editorial independence.
          </p>
          <p>
            JJUS promotes open-access publishing to ensure that sociological research is freely accessible to scholars, policymakers, and the global academic community. By fostering collaboration among authors, reviewers, and editors, the journal seeks to contribute meaningfully to the development of social science and the betterment of society.
          </p>
          <p>
            Through a commitment to quality, integrity, and inclusivity, Jadetimes Journal of Universal Studies strives to serve as a trusted international forum for sociological research and academic dialogue.
          </p>
        </div>
      </section>

      <section className="mb-16">
        <h2 className="text-3xl font-bold text-gray-900 mb-12">Our Values</h2>
        
        <div className="flex justify-center mb-16">
          <div className="relative w-[500px] h-[500px]">
            {/* Central Circle */}
            <div className="absolute inset-0 flex items-center justify-center z-10">
              <div className="bg-white w-48 h-48 rounded-full border-4 border-gray-100 flex flex-col items-center justify-center p-6 text-center shadow-lg">
                <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center mb-2">
                  <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                  </svg>
                </div>
                <p className="text-sm font-bold text-gray-900 leading-tight">Researcher-Centric Publishing</p>
                <p className="text-[10px] text-gray-500 mt-1">We place researchers at the core of everything we do, ensuring fairness, integrity, and academic value throughout the publishing process.</p>
              </div>
            </div>

            {/* Slices (using CSS/SVG representation) */}
            <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
              {/* Accessibility Slice */}
              <path d="M 50,50 L 50,0 A 50,50 0 0,1 93.3,25 Z" fill="#7c3aed" opacity="0.1" />
              {/* Quality Slice */}
              <path d="M 50,50 L 93.3,25 A 50,50 0 0,1 93.3,75 Z" fill="#2563eb" opacity="0.1" />
              {/* Collaboration Slice */}
              <path d="M 50,50 L 93.3,75 A 50,50 0 0,1 50,100 Z" fill="#10b981" opacity="0.1" />
              {/* Timeliness Slice */}
              <path d="M 50,50 L 50,100 A 50,50 0 0,1 6.7,75 Z" fill="#84cc16" opacity="0.1" />
              {/* Integrity Slice */}
              <path d="M 50,50 L 6.7,75 A 50,50 0 0,1 6.7,25 Z" fill="#047857" opacity="0.1" />
              {/* Top Slice (Placeholder) */}
              <path d="M 50,50 L 6.7,25 A 50,50 0 0,1 50,0 Z" fill="#eb4899" opacity="0.1" />
            </svg>

            {/* Value Labels around the circle */}
            <div className="absolute top-4 left-1/2 -translate-x-1/2 flex flex-col items-center">
              <div className="w-8 h-8 bg-pink-500 rounded-lg flex items-center justify-center mb-1">
                <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                </svg>
              </div>
              <span className="text-xs font-bold uppercase tracking-wider">Our Mission</span>
            </div>

            <div className="absolute top-1/4 right-0 flex flex-col items-center">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center mb-1">
                <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <span className="text-xs font-bold uppercase tracking-wider">Quality</span>
            </div>

            <div className="absolute bottom-1/4 right-4 flex flex-col items-center">
              <div className="w-8 h-8 bg-green-500 rounded-lg flex items-center justify-center mb-1">
                <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <span className="text-xs font-bold uppercase tracking-wider">Collaboration</span>
            </div>

            <div className="absolute bottom-1/4 left-4 flex flex-col items-center">
              <div className="w-8 h-8 bg-lime-500 rounded-lg flex items-center justify-center mb-1">
                <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <span className="text-xs font-bold uppercase tracking-wider">Timeliness</span>
            </div>

            <div className="absolute top-1/4 left-0 flex flex-col items-center">
              <div className="w-8 h-8 bg-purple-600 rounded-lg flex items-center justify-center mb-1">
                <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <span className="text-xs font-bold uppercase tracking-wider">Accessibility</span>
            </div>
            
            <div className="absolute top-0 left-1/4 -translate-x-1/2 flex flex-col items-center">
              <div className="w-8 h-8 bg-teal-700 rounded-lg flex items-center justify-center mb-1">
                <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <span className="text-xs font-bold uppercase tracking-wider">Integrity</span>
            </div>
          </div>
        </div>

        <p className="text-gray-700 text-lg leading-relaxed mb-12">
          The Jadetimes Journal of Universal Studies (JJUS) is guided by a set of core values that shape our editorial decisions, peer review practices, and engagement with the scholarly community.
        </p>

        <div className="space-y-10">
          <div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Academic Quality</h3>
            <p className="text-gray-600 leading-relaxed">We uphold rigorous academic standards through careful editorial oversight and a transparent peer review process, ensuring the publication of reliable and meaningful sociological research.</p>
          </div>
          <div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Integrity and Ethics</h3>
            <p className="text-gray-600 leading-relaxed">We are committed to ethical research practices, honesty, and accountability at all stages of submission, review, and publication.</p>
          </div>
          <div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Fairness and Transparency</h3>
            <p className="text-gray-600 leading-relaxed">We ensure impartial evaluation of manuscripts and clear communication with authors, reviewers, and editors throughout the publication process.</p>
          </div>
          <div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Researcher-Centered Approach</h3>
            <p className="text-gray-600 leading-relaxed">We place researchers at the center of our publishing model, valuing constructive feedback, academic independence, and respect for scholarly contributions.</p>
          </div>
          <div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Accessibility</h3>
            <p className="text-gray-600 leading-relaxed">We provide open-access research to ensure broad dissemination and access to sociological knowledge for all.</p>
          </div>
          <div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Collaboration</h3>
            <p className="text-gray-600 leading-relaxed">We encourage collaboration among authors, reviewers, editors, and institutions to strengthen sociological inquiry and academic dialogue.</p>
          </div>
          <div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Inclusivity</h3>
            <p className="text-gray-600 leading-relaxed">We welcome diverse perspectives, methodologies, and voices from different social, cultural, and geographic contexts.</p>
          </div>
        </div>
      </section>
    </div>
  );
}