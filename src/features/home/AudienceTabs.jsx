import React from "react";

/**
 * Segmented "pill" tabs used for Authors / Editors and reviewers / Collaborators
 */
export default function AudienceTabs({
  tabs = ["Authors", "Editors and reviewers", "Collaborators"],
  value = "Authors",
  onChange = () => {},
  offsetY = 55,
  gap = 24,
  chipColor = "#545555",
  trackBorder = "#D1D5DB",
}) {
  const isUp = offsetY < 0;
  const pillStyle = isUp ? { transform: `translateY(${offsetY}px)` } : { marginTop: offsetY };
  const spacerBelowPill = (isUp ? -offsetY : 0) + gap;

  return (
    <>
      <div className="w-full flex justify-center" style={pillStyle}>
        <div
          className="flex items-center bg-white rounded-full border p-[3px]"
          style={{ borderColor: trackBorder }}
        >
          {tabs.map((tab) => {
            const active = value === tab;
            return (
              <button
                key={tab}
                onClick={() => onChange(tab)}
                className="
                  rounded-full
                  px-5 md:px-6
                  py-2.5
                  text-sm
                  font-semibold
                  whitespace-nowrap
                  transition-colors
                  focus:outline-none
                "
                style={
                  active
                    ? { backgroundColor: chipColor, color: "#fff" }
                    : { color: chipColor, backgroundColor: "transparent" }
                }
                aria-pressed={active}
              >
                {tab}
              </button>
            );
          })}
        </div>
      </div>

      {/* Gap below the pill */}
      <div style={{ height: spacerBelowPill }} />
    </>
  );
}