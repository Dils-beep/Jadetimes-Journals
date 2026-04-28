import React from 'react';
import { Link } from 'react-router-dom';
import { Shield, Users, Mail, ArrowRight, CheckCircle2, Award } from 'lucide-react';
import EditorsGrid from '../features/journals/EditorsGrid';

// Reusing mock editors for consistency
const FEATURED_EDITORS = [
  {
    name: "Prof. Simranjit Singh",
    img: "https://api.dicebear.com/7.x/avataaars/svg?seed=Simranjit",
    org1: "Editor-in-Chief",
    org2: "Jadetimes Journals",
    role1: "Field Chief Editor",
    role2: "Multidisciplinary Research",
    linkedin: "https://www.linkedin.com/in/simrankaler/"
  },
  {
    name: "Dr. Sarah Johnson",
    img: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah",
    org1: "University of Oxford",
    org2: "Department of Social Sciences",
    role1: "Associate Editor",
    role2: "Global Policy",
  },
  {
    name: "Prof. Hiroshi Tanaka",
    img: "https://api.dicebear.com/7.x/avataaars/svg?seed=Hiroshi",
    org1: "University of Tokyo",
    org2: "Engineering & Technology",
    role1: "Section Editor",
    role2: "AI Systems",
  },
  {
    name: "Dr. Elena Rodriguez",
    img: "https://api.dicebear.com/7.x/avataaars/svg?seed=Elena",
    org1: "Stanford University",
    org2: "Health and Medicine",
    role1: "Review Editor",
    role2: "Clinical Research",
  }
];

export default function EditorialCommunity() {
  return (
    <div className="bg-white min-h-screen font-sans">
      {/* Hero Section */}
      <section className="bg-slate-50 border-b border-slate-100 py-20 md:py-32 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-blue-500/5 -skew-x-12 translate-x-1/4"></div>
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-100/50 rounded-full text-blue-700 text-sm font-bold mb-6">
              <Shield className="w-4 h-4" />
              <span>International Board of Experts</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-slate-900 font-serif mb-6 leading-tight">
              Our Editorial <span className="text-blue-600">Community</span>
            </h1>
            <p className="text-xl text-slate-600 mb-8 leading-relaxed font-light">
              A global network of distinguished experts driving scientific excellence and research integrity across all disciplines.
            </p>
            <div className="flex flex-wrap gap-4">
              <a href="#board" className="bg-slate-900 text-white px-8 py-3.5 rounded-full font-bold hover:bg-slate-800 transition-all flex items-center gap-2 shadow-lg">
                View Board <ArrowRight className="w-4 h-4" />
              </a>
              <Link to="/research/be-a-topic-editor" className="border border-blue-600 text-blue-600 px-8 py-3.5 rounded-full font-bold hover:bg-blue-50 transition-all">
                Join the Community
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats/Highlight Section */}
      <section className="py-16 bg-white border-b border-slate-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-4xl font-bold text-slate-900 mb-1 font-serif">500+</div>
              <div className="text-slate-500 text-sm uppercase tracking-widest font-bold">Expert Editors</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-slate-900 mb-1 font-serif">120+</div>
              <div className="text-slate-500 text-sm uppercase tracking-widest font-bold">Countries Represented</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-slate-900 mb-1 font-serif">15k+</div>
              <div className="text-slate-500 text-sm uppercase tracking-widest font-bold">Reviewers</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-slate-900 mb-1 font-serif">Top 1%</div>
              <div className="text-slate-500 text-sm uppercase tracking-widest font-bold">Researchers</div>
            </div>
          </div>
        </div>
      </section>

      {/* Board Section */}
      <div id="board">
        <EditorsGrid 
          editors={FEATURED_EDITORS} 
          heading="Field Chief Editors"
          seeAllTo="#"
        />
      </div>

      {/* Role Descriptions */}
      <section className="bg-slate-50 py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl font-bold text-slate-900 font-serif mb-4">Board Structure & Roles</h2>
            <p className="text-slate-600">Our editorial structure ensures rigorous oversight and specialized expertise at every stage of the publishing process.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm">
              <div className="w-12 h-12 bg-blue-100 rounded-2xl flex items-center justify-center mb-6">
                <Shield className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3 font-serif">Field Chief Editors</h3>
              <p className="text-slate-600 text-sm leading-relaxed mb-6">
                Leading experts responsible for the strategic direction and scientific standards of entire research fields.
              </p>
              <ul className="space-y-2">
                {['Directs journal strategy', 'Ensures high standards', 'Strategic board growth'].map(item => (
                  <li key={item} className="flex items-center gap-2 text-xs text-slate-500">
                    <CheckCircle2 className="w-3.5 h-3.5 text-green-500" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm">
              <div className="w-12 h-12 bg-purple-100 rounded-2xl flex items-center justify-center mb-6">
                <Users className="w-6 h-6 text-purple-600" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3 font-serif">Section Editors</h3>
              <p className="text-slate-600 text-sm leading-relaxed mb-6">
                Manage specific sub-disciplines, overseeing the peer-review process and making final manuscript decisions.
              </p>
              <ul className="space-y-2">
                {['Manages peer review', 'Final decisions', 'Topic curation'].map(item => (
                  <li key={item} className="flex items-center gap-2 text-xs text-slate-500">
                    <CheckCircle2 className="w-3.5 h-3.5 text-green-500" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm">
              <div className="w-12 h-12 bg-emerald-100 rounded-2xl flex items-center justify-center mb-6">
                <Award className="w-6 h-6 text-emerald-600" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3 font-serif">Topic Editors</h3>
              <p className="text-slate-600 text-sm leading-relaxed mb-6">
                Lead specific Research Topics, inviting contributions and building communities around emerging scientific themes.
              </p>
              <ul className="space-y-2">
                {['Invites contributors', 'Shapes emerging themes', 'Community building'].map(item => (
                  <li key={item} className="flex items-center gap-2 text-xs text-slate-500">
                    <CheckCircle2 className="w-3.5 h-3.5 text-green-500" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 max-w-7xl mx-auto px-6">
        <div className="bg-slate-900 rounded-[3rem] p-8 md:p-16 flex flex-col md:flex-row items-center justify-between gap-12 overflow-hidden relative">
          <div className="absolute top-0 right-0 w-1/2 h-full bg-blue-600/10 -skew-x-12 translate-x-1/2"></div>
          
          <div className="relative z-10 max-w-xl">
            <h2 className="text-3xl md:text-4xl font-bold text-white font-serif mb-6 leading-tight">
              Contributing to the Future of Science
            </h2>
            <p className="text-slate-300 text-lg mb-8 leading-relaxed">
              We are continuously expanding our board to include the most innovative minds in research. Explore how you can contribute as an editor or reviewer.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link to="/research/be-a-topic-editor" className="bg-blue-600 text-white px-8 py-3.5 rounded-full font-bold hover:bg-blue-700 transition-all flex items-center gap-2">
                Apply to Board
              </Link>
              <Link to="/contact" className="border border-white/20 text-white px-8 py-3.5 rounded-full font-bold hover:bg-white/10 transition-all flex items-center gap-2">
                <Mail className="w-4 h-4" /> Editorial Office
              </Link>
            </div>
          </div>
          
          <div className="relative z-10 grid grid-cols-2 gap-4 w-full md:w-auto shrink-0">
            <div className="p-6 bg-white/5 backdrop-blur-md rounded-2xl border border-white/10 text-center">
              <div className="text-white font-bold mb-1">Editors</div>
              <div className="text-blue-400 text-xs font-bold uppercase tracking-widest">Apply Now</div>
            </div>
            <div className="p-6 bg-white/5 backdrop-blur-md rounded-2xl border border-white/10 text-center">
              <div className="text-white font-bold mb-1">Reviewers</div>
              <div className="text-blue-400 text-xs font-bold uppercase tracking-widest">Open Call</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}