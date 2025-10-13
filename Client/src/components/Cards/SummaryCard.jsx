import React from "react";
import { LuTrash2 } from "react-icons/lu";
import { getInitials } from "../../utils/helper";

const SummaryCard = ({
  colors,
  role,
  topicsToFocus,
  experience,
  questions,
  description,
  lastUpdated,
  onSelect,
  onDelete,
}) => {
  return (
    <div
      className="bg-white border border-gray-200 rounded-2xl shadow-sm hover:shadow-lg transition-all duration-200 cursor-pointer relative group"
      onClick={onSelect}
    >
      {/* Top Colored Header */}
      <div
        className={`rounded-t-2xl p-4 relative`}
        // style={{ background:  "#E3D3FF"}}
      >
        <div className="flex items-start">
          {/* Initials */}
          <div className="flex-shrink-0 w-12 h-12 rounded-lg flex items-center justify-center shadow" style={{ background: colors?.bgcolor,  border: `1px solid ${colors?.borderColor || "#ccc"}`}}>
            <span className="text-lg font-semibold text-gray-800">
              {getInitials(role)}
            </span>
          </div>

          {/* Title + Skills */}
          <div className="ml-3 flex-grow text-white">
            <h2 className="text-[17px] font-semibold leading-snug text-gray-800">
              {role}
            </h2>
            <p className="text-xs font-medium opacity-90 text-gray-800">
              {topicsToFocus}
            </p>
          </div>
        </div>

        {/* Delete Button */}
        <button
          className="
            absolute top-3 right-3 
            flex items-center justify-center gap-1 
            bg-rose-500/90 hover:bg-rose-600 
            text-white text-xs font-medium rounded-md 
            shadow px-2.5 py-1 
            transition-all duration-200
            md:hidden      
            lg:hidden
            group-hover:flex lg:flex lg:opacity-0 lg:group-hover:opacity-100
          "
          onClick={(e) => {
            e.stopPropagation();
            onDelete();
          }}
        >
          <LuTrash2 size={14} className="inline-block" />
          <span className="hidden lg:inline-block">Delete</span>
        </button>
      </div>

      {/* Content Section */}
      <div className="px-4 pb-4">
        {/* Badges */}
        <div className="flex flex-wrap gap-2 mt-4">
          <span className="text-[11px] font-medium text-gray-800 bg-gray-100 px-3 py-1 rounded-full border border-gray-200">
            Experience: {experience} {experience == 1 ? "Year" : "Years"}
          </span>
          <span className="text-[11px] font-medium text-gray-800 bg-gray-100 px-3 py-1 rounded-full border border-gray-200">
            {questions} Q&A
          </span>
          <span className="text-[11px] font-medium text-gray-800 bg-gray-100 px-3 py-1 rounded-full border border-gray-200">
            Updated: {lastUpdated}
          </span>
        </div>

        {/* Description */}
        <p className="text-[13px] text-gray-600 font-normal line-clamp-2 mt-3 leading-snug">
          {description}
        </p>
      </div>
    </div>
  );
};

export default SummaryCard;
