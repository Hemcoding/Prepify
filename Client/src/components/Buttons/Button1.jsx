import React from "react";

const Button1 = ({ children, onClick, type = "button", className = "" }) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`
        bg-violet-600 text-white font-semibold px-6 py-2 
        rounded-full shadow-md
        transition-transform transform
        hover:scale-105 hover:shadow-lg hover:bg-violet-700
        active:scale-95
        focus:outline-none focus:ring-2 focus:ring-violet-400 focus:ring-offset-2
        cursor-pointer
        ${className}
      `}
    >
      {children}
    </button>
  );
};

export default Button1;
