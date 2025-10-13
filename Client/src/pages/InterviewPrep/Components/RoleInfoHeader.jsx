import React from "react";
import { motion } from "framer-motion";

const RoleInfoHeader = ({
  role,
  topicsToFocus,
  experience,
  questions,
  description,
  lastUpdated,
}) => {
  return (
    <div className="relative overflow-hidden">
      {/* Container */}
      <div className="container grid mx-auto px-4 sm:px-8 md:px-16 lg:px-20 mt-18 ">
        {/* Header content */}
        <motion.div
          className={`min-h-[160px] md:h-[200px] flex flex-col justify-center relative z-10`}
        >
          <div className="flex flex-col md:flex-row md:items-start">
            <div className="flex-grow">
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-2">
                <div>
                  <h2 className="text-xl sm:text-2xl md:text-3xl font-semibold text-gray-900">
                    {role}
                  </h2>
                  <p className="text-sm sm:text-base text-gray-700 mt-1">
                    {topicsToFocus}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Info Badges */}
          <div className="flex flex-wrap items-center gap-2 sm:gap-3 mt-4">
            <div className="text-[10px] sm:text-xs font-semibold text-white bg-violet-500 px-3 py-2 rounded-full">
              Experience: {experience} {experience == 1 ? "Year" : "Years"}
            </div>

            <div className="text-[10px] sm:text-xs font-semibold text-white bg-violet-500 px-3 py-2 rounded-full">
              {questions} Q&A
            </div>

            <div className="text-[10px] sm:text-xs font-semibold text-white bg-violet-500 px-3 py-2 rounded-full whitespace-nowrap">
              Last Updated: {lastUpdated}
            </div>
          </div>

          {/* Description (optional) */}
          {description && (
            <p className="text-xs sm:text-sm text-gray-600 mt-3 max-w-full sm:max-w-[90%] md:max-w-[80%] leading-relaxed">
              {description}
            </p>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default RoleInfoHeader;
