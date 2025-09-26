import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ProfileInfoCard from "../Cards/ProfileInfoCard";

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 5);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  return (
    <header
      className={`fixed top-0 w-full z-50 transition-colors duration-500 ${
        scrolled
          ? "bg-white/20 backdrop-blur-md border border-white/30 shadow-md"
          : "bg-transparent"
      }`}
    >
      <div className="flex items-center justify-between max-w-8xl mx-auto px-5 md:px-7 lg:px-8 py-4 md:py-7 lg:py-4">
        <span className="text-3xl sm:text-3xl md:text-4xl lg:text-2xl font-extrabold text-violet-500 transition-all duration-300">
          Prepify
        </span>

        <ProfileInfoCard />
      </div>
    </header>
  );
};

export default Navbar;
