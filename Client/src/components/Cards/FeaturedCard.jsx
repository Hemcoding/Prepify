import React from "react";

const FeaturedCard = ({ feature }) => {

  const Icon = feature.icon;

  return (
    <div className="flex flex-col justify-start gap-2 bg-white border-t-4 border-violet-500 rounded-3xl p-5 cursor-pointer shadow-sm hover:scale-105 transition-transform duration-300">
      <div className="relative mb-6">
        <div className="inline-flex p-4 rounded-2xl bg-gradient-to-br from-violet-500/20 to-purple-600/20 backdrop-blur-sm border border-violet-400/30 group-hover:scale-110 transition-transform duration-300">
          <Icon size={28} className="text-white" />
        </div>
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-violet-500/10 to-purple-600/10 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
      </div>
      <h3 className="text-2xl font-bold text-violet-500 mb-4 group-hover:scale-105 transition-transform duration-300 origin-left">
        {feature.title}
      </h3>
      
      <p className="text-gray-500 leading-relaxed text-md group-hover:text-white/80 transition-colors duration-300">
        {feature.description}
      </p>
    </div>
  );
};

export default FeaturedCard;
