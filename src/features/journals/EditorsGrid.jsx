import { Link } from "react-router-dom";
import { FaLinkedin } from "react-icons/fa";

export default function EditorsGrid({ editors = [], heading = "Editors", seeAllTo = "#" }) {
  return (
    <section className="max-w-7xl mx-auto px-6 lg:px-10 py-14 md:py-20">
      <div className="flex items-baseline gap-4 mb-8">
        <h2 className="text-3xl font-normal text-gray-900">{heading}</h2>
        <Link to={seeAllTo} className="text-sm font-semibold text-green-700 hover:underline flex items-center gap-1">
          See all <span className="text-lg leading-none">&rarr;</span>
        </Link>
      </div>

      <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {editors.map((e, i) => (
          <div key={i} className="bg-white rounded-lg border border-gray-100 p-8 text-center shadow-sm hover:shadow-md transition-shadow">
            <img src={e.img} alt={e.name} className="w-24 h-24 rounded-full object-cover mx-auto mb-4" />
            <div className="flex items-center justify-center gap-2 mb-1">
              <h3 className="text-lg font-semibold text-gray-900">{e.name}</h3>
              {e.linkedin && (
                <a href={e.linkedin} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-700">
                  <FaLinkedin size={16} />
                </a>
              )}
            </div>
            <p className="text-sm text-gray-600 mt-1">{e.org1}</p>
            <p className="text-sm text-gray-600">{e.org2}</p>
            <div className="h-px bg-gray-200 w-16 mx-auto my-6" />
            <p className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-1">{e.role1}</p>
            <p className="text-sm text-gray-800">{e.role2}</p>
          </div>
        ))}
      </div>
    </section>
  );
}