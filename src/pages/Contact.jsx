import React from 'react';
import { HeroImage } from '../components/ui/PublishingComponents';
import wallpaperImg from '../assets/images/JIJ Wallpaper.webp';

const agents = {
  america: [
    {
      name: "United States New Mexico Agent",
      address: "8206 Louisiana Blvd NE, Ste B #10493, Albuquerque, NM 87112",
      phone: "+1 617 323 4538",
      fax: "+1 617 323 4538"
    },
    {
      name: "United States New York Agent",
      address: "145 Bishop Street, Staten Island, NY 10306, USA",
      landline: "+1 929 321 3710",
      fax: "+1 929 321 3710"
    },
    {
      name: "Florida Agent",
      address: "26624 Racquet Circle, Leesburg, FL 34748",
      mobile: "+1 513 533-1882"
    },
    {
      name: "United States Wisconsin Agent",
      address: "W11052 Street Rd, Pleasant Prairie, WI 53158",
      mobile: "+1 754 224 2335"
    }
  ],
  uk: [
    {
      name: "Edinburgh Agent, UK",
      address: "21 Salvador Avenue, Livingston, Edinburgh, United Kingdom",
      mobile: "+44 7888975895"
    },
    {
      name: "London Agent, UK",
      address: "No. 2 Skyline, Hatfield, AL 10 9SJ, Hertfordshire",
      mobile: "+44 7431414389"
    },
    {
      name: "Plymouth Agent, UK",
      address: "202 Grenville Rd, Plymouth PL4 9QL, United Kingdom",
      mobile: "+44 7511 111407"
    },
    {
      name: "Chester Agent, UK",
      address: "Church College Close, Chester CH1 4BJ, United Kingdom",
      mobile: "+44 7510162583"
    }
  ],
  global: [
    {
      name: "Sweden Agent",
      address: "14B4, Jonisvägen 121, Huddinge, Stockholm, Sweden, 14156",
      landline: "+46 876 431 7837",
      fax: "+44 676 431 7837"
    },
    {
      name: "India Agent",
      address: "Office no 475, New Civil Road, Jalandhar, Punjab, 144001, India",
      landline: "+91 93191 53191",
      fax: "+91 53191 53191"
    },
    {
      name: "Germany Agent",
      address: "Megaforce GmbH, Limrichter Str. 2, Dusseldorf, 40212, Germany",
      landline: "+49 172 2336873",
      fax: "+49 172 2336873"
    },
    {
      name: "Spain Agent",
      address: "Moll de costa, Tinglado 2, Tarragona, 43004",
      landline: "+3 463 213 2324"
    },
    {
      name: "Sri Lanka Agent",
      address: "No 04/AVI Bulugahagoda, Ganemulla, Sri Lanka",
      mobile: "+94 71 083 6631"
    },
    {
      name: "Australia Agent",
      address: "10 level 2, 23 Pyrmont road, Pyrmont, NSW, Australia",
      mobile: "+61 405 257522"
    },
    {
      name: "Canada Agent",
      address: "650 R 7th Line Road Wolfe Island KOH 2YO, Ontario, Canada",
      mobile: "+1 613 7703355"
    },
    {
      name: "Oman Agent",
      address: "C38, Ghala, Muscat, Oman",
      mobile: "+968 9205 1312"
    }
  ]
};

const moreLinks = [
  { label: "Jadetimes Journals Planet Prize", to: "#" },
  { label: "Press office", to: "#" },
  { label: "Career opportunities", to: "#" },
  { label: "Contact us", to: "/contact" }
];

export default function Contact() {
  return (
    <div className="max-w-[1240px] mx-auto px-6 py-12 animate-in fade-in duration-700">
      <h1 className="text-4xl font-black text-gray-900 mb-8 font-serif">Contact us</h1>

      <HeroImage 
        src={wallpaperImg} 
        alt="Jadetimes International Journals Office" 
      />

      <div className="flex flex-col lg:flex-row gap-16 mt-16">
        {/* Left Content Area */}
        <div className="flex-1 min-w-0">
          <section className="bg-white border border-gray-100 rounded-2xl p-8 shadow-sm">
            <h2 className="text-2xl font-black text-gray-900 mb-8 font-serif border-b border-gray-50 pb-4">Our Agents</h2>

            <div className="space-y-12">
              {/* America */}
              <div>
                <h3 className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-6">Support Contacts in the America</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {agents.america.map((agent, i) => (
                    <AgentCard key={i} {...agent} />
                  ))}
                </div>
              </div>

              {/* UK */}
              <div>
                <h3 className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-6">Support Contacts in the United Kingdom</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {agents.uk.map((agent, i) => (
                    <AgentCard key={i} {...agent} />
                  ))}
                </div>
              </div>

              {/* Global */}
              <div>
                <h3 className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-6">Global Agents</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {agents.global.map((agent, i) => (
                    <AgentCard key={i} {...agent} />
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* General Contact Panel */}
          <div className="mt-8 bg-[#0a1128] text-white rounded-2xl p-10">
            <h2 className="text-xl font-bold mb-8">General Contact</h2>
            <div className="space-y-6 text-slate-300">
              <div className="flex gap-4">
                <span className="font-bold text-white min-w-[60px]">Post:</span>
                <span>Jadetimes Media LLC, 8206 Louisiana Blvd NE, Ste B #10493, Albuquerque, NM 87112 United States</span>
              </div>
              <div className="flex gap-4">
                <span className="font-bold text-white min-w-[60px]">Email:</span>
                <a href="mailto:info@jadetimes.com" className="text-blue-400 hover:underline">info@jadetimes.com</a>
              </div>
              <div className="flex gap-4">
                <span className="font-bold text-white min-w-[60px]">Phone:</span>
                <span>+1 929 321 3710 (USA)</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Sidebar */}
        <aside className="w-full lg:w-80 shrink-0">
          <div className="sticky top-32">
            <h3 className="text-sm font-bold text-gray-900 uppercase tracking-widest mb-6 border-b border-gray-100 pb-2 font-serif">
              More from Jadetimes Journals
            </h3>
            <nav className="flex flex-col space-y-4">
              {moreLinks.map((link, i) => (
                <a
                  key={i}
                  href={link.to}
                  className="text-[15px] text-blue-600 hover:text-blue-800 font-medium transition-colors"
                >
                  {link.label}
                </a>
              ))}
            </nav>
          </div>
        </aside>
      </div>
    </div>
  );
}

function AgentCard({ name, address, phone, fax, mobile, landline }) {
  return (
    <div className="bg-slate-50 border border-slate-100 p-5 rounded-xl hover:shadow-md transition-shadow">
      <h4 className="font-bold text-gray-900 mb-3 text-[15px]">{name}</h4>
      <p className="text-sm text-gray-500 leading-relaxed mb-4">{address}</p>
      <div className="space-y-1 text-xs font-bold text-gray-600">
        {phone && <p>Phone: {phone}</p>}
        {landline && <p>Landline: {landline}</p>}
        {mobile && <p>Mobile: {mobile}</p>}
        {fax && <p>Fax: {fax}</p>}
      </div>
    </div>
  );
}