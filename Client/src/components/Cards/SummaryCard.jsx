import React from 'react'
import { LuTrash2 } from 'react-icons/lu';
import { getInitials } from '../../utils/helper';

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
      {console.log(colors.bgcolor)}
      <div
        className={`bg-${colors.bgcolor} rounded-t-2xl p-4 relative`}
        
      >
        <div className="flex items-start">
          {/* Initials */}
          <div className="flex-shrink-0 w-12 h-12 bg-white rounded-lg flex items-center justify-center shadow">
            <span className="text-lg font-semibold text-gray-800">
              {getInitials(role)}
            </span>
          </div>

          {/* Title + Skills */}
          <div className="ml-3 flex-grow text-white">
            <h2 className="text-[17px] font-semibold leading-snug text-gray-800">{role}</h2>
            <p className="text-xs font-medium opacity-90 text-gray-800" >{topicsToFocus}</p>
          </div>
        </div>

        {/* Delete button */}
        <button
          className="block md:hidden group-hover:flex items-center gap-1 text-xs text-white bg-rose-500/90 px-2.5 py-1 rounded-md shadow hover:bg-rose-600 absolute top-3 right-3"
          onClick={(e) => {
            e.stopPropagation();
            onDelete();
          }}
        >
          <LuTrash2 size={14} />
          Delete
        </button>
      </div>

      {/* Content Section */}
      <div className="px-4 pb-4">
        {/* Badges */}
        <div className="flex flex-wrap gap-2 mt-4">
          <span className="text-[11px] font-medium text-gray-800 bg-gray-100 px-3 py-1 rounded-full border border-gray-200">
            Experience: {experience} {experience == 1 ? 'Year' : 'Years'}
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