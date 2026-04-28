import React from 'react';
import { HeroImage, NumberedSection, PartnershipsCard } from '../../components/ui/PublishingComponents';
import feesImg from '../../assets/images/Publishig Fees.webp';

// According to the user, this page should look IDENTICAL to the Fee Policy page.
export default function ArticleTypesPage() {
  return (
    <div className="pb-20 animate-in fade-in duration-700">
      <HeroImage 
        src={feesImg} 
        alt="Article Types and Publication Fees" 
      />

      <h1 className="text-[32px] font-black text-gray-900 mb-6 font-serif leading-tight">
        Article Types and Publication Fees
      </h1>

      <p className="text-gray-600 text-[15px] leading-relaxed mb-10">
        Jadetimes Journal of Universal Studies (JJUS) publishes high-quality scholarly work that contributes to the advancement of Sociology. The journal accepts the following categories of manuscripts.
      </p>

      <div className="space-y-2">
        <NumberedSection number="1" title="Original Research Articles">
          <p>Original Research Articles should present empirical, theoretical, or methodological studies that contribute meaningfully to the field of Sociology.</p>
          <ul className="space-y-3 mt-4">
            <li className="flex items-start gap-3">
              <span className="text-blue-600 mt-1.5 transform scale-150">•</span>
              <span>Manuscripts must demonstrate a clear sociological framework</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-blue-600 mt-1.5 transform scale-150">•</span>
              <span>The study should offer original insights, analysis, or findings</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-blue-600 mt-1.5 transform scale-150">•</span>
              <span>Research may use quantitative, qualitative, or mixed-methods approaches</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-blue-600 mt-1.5 transform scale-150">•</span>
              <span>Typical length: up to 5,000 words, including references, tables, and figures</span>
            </li>
          </ul>
          <p className="text-[14px] text-gray-400 italic mt-4">
            Please refer to the <a href="/publishing/author-guidelines" className="text-blue-600 hover:underline transition-colors font-medium">author guidelines</a> for formatting details.
          </p>
        </NumberedSection>

        <NumberedSection number="2" title="Review Articles">
          <p>Review Articles should provide a critical and comprehensive synthesis of existing literature relevant to sociology.</p>
          <ul className="space-y-3 mt-4">
            <li className="flex items-start gap-3">
              <span className="text-blue-600 mt-1.5 transform scale-150">•</span>
              <span>May include systematic reviews, meta-analyses, or narrative reviews</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-blue-600 mt-1.5 transform scale-150">•</span>
              <span>Must clearly describe the review methodology and data sources</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-blue-600 mt-1.5 transform scale-150">•</span>
              <span>Should identify research gaps, theoretical debates, and future directions</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-blue-600 mt-1.5 transform scale-150">•</span>
              <span>Typical length: up to 5,000 words, including references, tables, and figures</span>
            </li>
          </ul>
        </NumberedSection>

        <section className="mt-16 space-y-6">
          <h2 className="text-2xl font-black text-gray-900 font-serif">Publication Fees</h2>
          <p className="text-gray-600 text-[15px] leading-relaxed">
            Jadetimes Journal of Universal Studies (JJUS) operates under a no-fee, open-access publishing model.
          </p>
          <ul className="space-y-3">
            <li className="flex items-start gap-3">
              <span className="text-blue-600 mt-1.5 transform scale-150">•</span>
              <span className="text-gray-600 text-[15px]">No submission fees</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-blue-600 mt-1.5 transform scale-150">•</span>
              <span className="text-gray-600 text-[15px]">No article processing charges (APCs)</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-blue-600 mt-1.5 transform scale-150">•</span>
              <span className="text-gray-600 text-[15px]">No publication fees</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-blue-600 mt-1.5 transform scale-150">•</span>
              <span className="text-gray-600 text-[15px]">No review fees</span>
            </li>
          </ul>
          <p className="text-[15px] text-gray-700 leading-relaxed pt-2">
            Authors are <span className="font-bold">not charged</span> at any stage of the submission, review, or publication process. The journal is committed to <span className="font-bold">equitable and inclusive scholarly publishing</span>, ensuring that the ability to publish is not influenced by financial constraints.
          </p>
        </section>

        <section className="mt-16 space-y-6">
          <h2 className="text-2xl font-black text-gray-900 font-serif">Optional Charges</h2>
          <p className="text-gray-600 text-[15px] leading-relaxed">
            There are <span className="font-bold">no mandatory charges</span> for standard publications. In exceptional cases, authors may be contacted <span className="font-bold">only</span> if optional services (such as extensive language editing or special formatting requests) are requested by the author. Any such charges, if applicable, will be <span className="font-bold">clearly communicated in advance</span>, and author consent will be obtained before proceeding.
          </p>
        </section>

        <PartnershipsCard />
      </div>
    </div>
  );
}
