import React from "react";
import { Link, useLocation } from "react-router-dom";

export default function AboutSidebar() {
  const { pathname } = useLocation();

  const links = [
    { label: "Mission and values", to: "/about-us/mission" },
    { label: "History", to: "/about-us/history" },
    { label: "Editorial board", to: "/editorial-community" },
    { label: "Awards", to: "/about-us/awards" },
  ];

  return (
    // This div will stick to the top (top-28) and stop when its parent container ends (at the footer)
    <div className="hidden lg:block lg:sticky lg:top-28 self-start">
      <h3 className="text-lg font-semibold text-gray-900 mb-4 border-b-2 border-gray-200 pb-1 inline-block">
        Who we are
      </h3>
      <nav>
        <ul className="space-y-3">
          {links.map((link) => {
            const isActive = pathname === link.to;
            return (
              <li key={link.label}>
                <Link
                  to={link.to}
                  className={
                    "block text-gray-600 hover:text-blue-600 transition-colors " +
                    (isActive ? "font-semibold text-blue-600" : "")
                  }
                >
                  {link.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </div>
  );
}