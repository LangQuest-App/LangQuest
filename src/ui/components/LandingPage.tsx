import { useState, useEffect } from "react";
import { ArrowRight } from "lucide-react";
// import Logo from "/images/Logo.png"; // Temporarily commented out
import { Link } from "react-router-dom";
// import { useUser } from "../lib/contextStores/userStore";

const LandingPage = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-green-50/50 to-emerald-50/70 overflow-hidden relative">
      {/* Floating Background Elements */}
         <div className="absolute -top-60 -right-60 w-[800px] h-[800px] bg-gradient-to-br from-green-400/30 to-emerald-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-60 -left-60 w-[900px] h-[900px] bg-gradient-to-tr from-green-300/25 to-teal-400/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/3 right-1/4 w-[400px] h-[400px] bg-gradient-to-bl from-emerald-200/20 to-green-400/15 rounded-full blur-2xl animate-pulse delay-2000"></div>
      {/* Main Content */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-6 text-center">
        {/* Logo Section */}
        <div
          className={`transform transition-all duration-1000 ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
          }`}
        >
          <div className="relative group mb-12">
            <img
              src="/images/Logo.png"
              alt="LangQuest Logo"
              className="relative w-48 h-48 mx-auto rounded-full border-4 border-white/90 group-hover:scale-105 transition-transform duration-300"
              style={{
                boxShadow:
                  "0px 8px 32px rgba(34, 197, 94, 0.2), 0px 0px 0px 1px rgba(255, 255, 255, 0.8)",
              }}
            />
          </div>
        </div>
        {/* Welcome Text */}
        <div
          className={`transform transition-all duration-1000 delay-300 ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
          }`}
        >
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-black mb-8 bg-[#45BB19] text-shadow-2xs bg-clip-text text-transparent leading-tight font-fredoka-heading drop-shadow-sm">
            Welcome to LangQuest
          </h1>
        </div>
        {/* CTA Buttons */}
        <div
          className={`transform transition-all duration-1000 delay-600 flex flex-col sm:flex-row gap-4 items-center ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
          }`}
        >
          <Link
            to={"/signup"}
            className="group relative inline-block px-12 py-6 bg-[#45BB19] text-white font-bold text-xl rounded-2xl shadow-2xl hover:shadow-green-400/40 transition-all duration-300 hover:scale-105 overflow-hidden tracking-wider font-fredoka"
          >
            {/* Enhanced Glossy overlay effect */}
            <div className="absolute inset-0 bg-gradient-to-br from-white/70 via-white/30 to-white/5 rounded-2xl"></div>
            <div className="absolute top-0 left-0 w-3/4 h-1/2 bg-gradient-to-br from-white/50 to-transparent rounded-tl-2xl"></div>
            {/* Hover effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-emerald-300 to-green-300 opacity-0 group-hover:opacity-20 transition-opacity duration-300 rounded-2xl"></div>
            {/* Inner shadow for depth */}
            <div className="absolute inset-0 rounded-2xl shadow-inner shadow-black/10"></div>
            <span className="relative flex items-center justify-center">
              Start Your Journey
              <ArrowRight className="ml-3 w-6 h-6 group-hover:translate-x-1 transition-transform duration-300" />
            </span>
          </Link>
          
          <Link
            to={"/scene"}
            className="group relative inline-block px-12 py-6 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-bold text-xl rounded-2xl shadow-2xl hover:shadow-blue-400/40 transition-all duration-300 hover:scale-105 overflow-hidden tracking-wider font-fredoka"
          >
            {/* Enhanced Glossy overlay effect */}
            <div className="absolute inset-0 bg-gradient-to-br from-white/70 via-white/30 to-white/5 rounded-2xl"></div>
            <div className="absolute top-0 left-0 w-3/4 h-1/2 bg-gradient-to-br from-white/50 to-transparent rounded-tl-2xl"></div>
            {/* Hover effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-400 opacity-0 group-hover:opacity-20 transition-opacity duration-300 rounded-2xl"></div>
            {/* Inner shadow for depth */}
            <div className="absolute inset-0 rounded-2xl shadow-inner shadow-black/10"></div>
            <span className="relative flex items-center justify-center">
              Practice Scene
              <ArrowRight className="ml-3 w-6 h-6 group-hover:translate-x-1 transition-transform duration-300" />
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LandingPage
