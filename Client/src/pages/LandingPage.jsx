import React, { useEffect, useState } from "react";
import Button1 from "../components/Buttons/Button1.jsx";
import Button2 from "../components/Buttons/Button2.jsx";
import desktopView from "../assets/Images/desktop_view.png";
import { APP_FEATURES } from "../utils/data";
import FeaturedCard from "../components/Cards/FeaturedCard.jsx";
import { MdAutoAwesome } from "react-icons/md";
import Lottie from "lottie-react";
import Aibot from "../assets/lotties/Robot-Bot 3D.json";
import { useNavigate } from "react-router-dom";

const LandingPage = () => {
  const [scrolled, setScrolled] = useState(false);

  const currentYear = new Date().getFullYear();

  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 5);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <header
        className={`fixed top-0 w-full z-50 transition-colors duration-500 ${
          scrolled
            ? "bg-white/20 backdrop-blur-md border border-white/30 shadow-md"
            : "bg-transparent"
        }`}
      >
        <div className="flex items-center justify-between max-w-7xl mx-auto px-5 md:px-7 lg:px-8 py-4 md:py-7 lg:py-4">
          <span className="text-3xl sm:text-3xl md:text-4xl lg:text-2xl font-extrabold text-violet-500 transition-all duration-300">
            Prepify
          </span>

          <div className="flex gap-3 items-center">
            <a
              className="px-4 sm:px-6 py-2 font-semibold text-violet-500 cursor-pointer hover:scale-105 active:scale-95"
              onClick={() => navigate("/login")}
            >
              Login
            </a>
            <Button1 className="hidden sm:block" children="Sign Up" />
          </div>
        </div>
      </header>

      <section className="bg-radial from-violet-200 from-20% to-white w-full py-28 md:py-40 px-4">
        <div className="flex flex-col items-center text-center w-full">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-violet-100 text-violet-600 font-semibold text-sm shadow-sm border border-violet-200 animate-pulse">
            <MdAutoAwesome />
            <span className="font-bold"> AI Powered</span>
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-black drop-shadow-lg leading-tight">
            Ace Your Interviews with
          </h1>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-black drop-shadow-lg leading-tight mb-3">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-violet-500 from-80% to-white animate-pulse">
              AI Powered
            </span>{" "}
            Pricision
          </h1>
          <p className="text-lg sm:text-xl text-gray-600">
            Personalized interview questions and instant explanations
          </p>
          <p className="text-lg sm:text-xl mb-5 text-gray-600">
            tailored to your role.
          </p>
          <Button1 className="m-5" children="Get Started" onClick={() => navigate("/login")} />
        </div>
      </section>

      <section className="relative flex justify-center -mt-10 sm:-mt-20 px-4">
        {/* Main background image */}
        <img
          className="w-full sm:w-[80%] md:w-[70%] rounded-2xl border-4 border-black shadow-lg"
          src={desktopView}
          alt="Desktop application view"
        />
      </section>

      <section className="flex flex-col items-center bg-gradient-to-b from-white via-violet-100 to-white py-20 px-4 sm:px-6">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center text-gray-800 mb-14">
          Features that make you stand out
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 md:gap-8 w-full sm:w-[90%] md:w-[80%]">
          {APP_FEATURES.map((feature, index) => (
            <FeaturedCard feature={feature} key={index} />
          ))}
        </div>
      </section>

      <section className="flex justify-center w-full py-10 px-4 bg-white">
        <div className="flex flex-col items-center gap-6 md:gap-10 p-6 sm:p-10 md:p-15 bg-gradient-to-l from-violet-500 to-violet-500 rounded-3xl shadow-sm w-full sm:w-auto text-center">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white">
            Ready to crack your next interview?
          </h1>
          <Button2 children="Get Started" color="white" textColor="violet" onClick={() => navigate("/login")} />
        </div>
      </section>

      <footer className="flex flex-col gap-4 sm:flex-row justify-between items-center w-full bg-white p-5 shadow-[0px_-4px_6px_-1px_rgba(0,0,0,0.1)] text-center sm:text-left">
        <div className="flex items-center">
          <h3 className="text-2xl font-bold bg-clip-text text-violet-500">
            Prepify
          </h3>
        </div>
        <div className="flex items-center text-gray-600 text-sm sm:text-md">
          <span>Made by</span>
          <span className="text-violet-400 font-semibold ml-1">
            Hemanshu Parmar
          </span>
        </div>
        <div className="text-gray-600 text-sm sm:text-md">
          © {currentYear} Prepify. All rights reserved.
        </div>
      </footer>
    </>
  );
};

export default LandingPage;
