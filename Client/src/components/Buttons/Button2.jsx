import React from "react";

const Button2 = ({ children, onClick, type = "button", className = "" }) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`
        bg-white text-violet-500 font-semibold px-6 py-2 
        rounded-full shadow-md
        transition-transform transform
        hover:scale-105 hover:shadow-lg hover:bg-white
        active:scale-95
        focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2
        cursor-pointer
        ${className}
      `}
    >
      {children}
    </button>
  );
};

export default Button2;