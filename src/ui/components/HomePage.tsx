import { ArrowRight, Play, Star, Zap } from "lucide-react";
import FrogBook from  "/images/frog-book.png"
import { Link } from "react-router-dom";
import BackToHome from "./Buttons/BackToHome";
import LogoutButton from "./Buttons/LogoutButton";

const Hero = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-green-50 to-teal-50 overflow-hidden relative">
      {/* Enhanced Floating Background Elements */}

      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Wider gradient orbs */}
        <div className="absolute -top-60 -right-60 w-[800px] h-[800px] bg-gradient-to-br from-green-400/30 to-emerald-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-60 -left-60 w-[900px] h-[900px] bg-gradient-to-tr from-green-300/25 to-teal-400/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/3 right-1/4 w-[400px] h-[400px] bg-gradient-to-bl from-emerald-200/20 to-green-400/15 rounded-full blur-2xl animate-pulse delay-2000"></div>

        {/* Floating particles */}
        <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-green-400/60 rounded-full animate-bounce delay-300"></div>
        <div className="absolute top-3/4 right-1/3 w-3 h-3 bg-emerald-300/50 rounded-full animate-bounce delay-700"></div>
        <div className="absolute top-1/2 left-3/4 w-1.5 h-1.5 bg-teal-400/60 rounded-full animate-bounce delay-1100"></div>
      </div>

     {/* <BackToHome/> */}

     <LogoutButton/>
      <section className="min-h-screen flex items-center justify-center pt-16 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left Content */}
            <div className="space-y-8">
              <div className="space-y-4 font-family-fredoka">
                <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 leading-snug tracking-tight mb-2">
                  Master Any{" "}
                  <span className="bg-gradient-to-r from-[#45BB19] via-emerald-500 to-green-600 bg-clip-text text-transparent animate-pulse">
                    Language
                  </span>
                </h1>
                <h2 className="text-3xl lg:text-4xl font-semibold text-gray-800 mb-1">
                  Naturally
                </h2>
                <p className="text-base lg:text-lg font-medium bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent mb-2">
                  Fun. Fast. Froggishly Smart.
                </p>
              </div>

              <p className="text-lg lg:text-xl text-gray-600 leading-relaxed max-w-xl">
                Join millions learning languages through immersive conversations
                with our AI-powered frog companion.{" "}
                <span className="font-semibold text-gray-700">
                  Experience the future of language learning today.
                </span>
              </p>

              {/* Enhanced Buttons */}
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to={"/lessons"} className="group relative">
                <button className="group relative bg-[#45BB19]  text-white px-8 py-4 rounded-2xl font-semibold text-lg shadow-2xl hover:shadow-green-500/30 transition-all duration-300 hover:scale-105 overflow-hidden">
                  {/* Glossy overlay effect */}
                  <div className="absolute inset-0 bg-gradient-to-b from-white/30 via-white/10 to-transparent"></div>
                  <div className="absolute top-0 left-0 right-0 h-1/2 bg-gradient-to-b from-white/20 to-transparent rounded-t-2xl"></div>

                  {/* Animated shine effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-700"></div>

                  <span className="relative flex items-center justify-center">
                    <Zap className="mr-3 h-5 w-5" />
                    Start Learning Free
                    <ArrowRight className="ml-3 h-5 w-5 group-hover:translate-x-2 transition-transform" />
                  </span>
                </button>
                </Link>
                <button className="group border-2 border-[#45BB19] text-[#45BB19] hover:bg-[#45BB19] hover:text-white px-8 py-4 rounded-2xl font-semibold text-lg transition-all duration-300 bg-white/80 backdrop-blur-sm hover:shadow-xl">
                  <Play className="mr-3 h-5 w-5 group-hover:scale-110 transition-transform inline" />
                  Watch Demo
                </button>
              </div>

              {/* Enhanced Stats */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4">
                <div className="flex items-center space-x-2 bg-white/80 backdrop-blur-sm rounded-lg p-2.5 shadow-md border border-green-100/40 h-12 min-h-0">
                  <div className="w-2.5 h-2.5 rounded-full bg-gradient-to-r from-emerald-400 to-green-500"></div>
                  <div>
                    <p className="font-bold text-gray-900 text-base">
                      40+ Languages
                    </p>
                    <p className="text-xs text-gray-600">Available now</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2 bg-white/80 backdrop-blur-sm rounded-lg p-2.5 shadow-md border border-green-100/40 h-12 min-h-0">
                  <div className="w-2.5 h-2.5 rounded-full bg-gradient-to-r from-[#45BB19] to-emerald-500"></div>
                  <div>
                    <p className="font-bold text-gray-900 text-base">
                      AI-Powered
                    </p>
                    <p className="text-xs text-gray-600">Smart learning</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2 bg-white/80 backdrop-blur-sm rounded-lg p-2.5 shadow-md border border-green-100/40 h-12 min-h-0">
                  <div className="w-2.5 h-2.5 rounded-full bg-gradient-to-r from-green-600 to-teal-500"></div>
                  <div>
                    <p className="font-bold text-gray-900 text-base">
                      5M+ Users
                    </p>
                    <p className="text-xs text-gray-600">Trust us daily</p>
                  </div>
                </div>
              </div>

              {/* Social Proof */}
              <div className="flex items-center space-x-4 pt-2">
                <div className="flex -space-x-2">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-r from-green-400 to-emerald-500 border-2 border-white"></div>
                  <div className="w-8 h-8 rounded-full bg-gradient-to-r from-emerald-400 to-teal-500 border-2 border-white"></div>
                  <div className="w-8 h-8 rounded-full bg-gradient-to-r from-teal-400 to-green-500 border-2 border-white"></div>
                  <div className="w-8 h-8 rounded-full bg-gradient-to-r from-green-500 to-emerald-600 border-2 border-white flex items-center justify-center text-white text-xs font-bold">
                    +
                  </div>
                </div>
                <div className="flex items-center space-x-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-4 h-4 fill-yellow-400 text-yellow-400"
                    />
                  ))}
                  <span className="ml-2 text-sm font-medium text-gray-700">
                    4.9/5 from 50k+ reviews
                  </span>
                </div>
              </div>
            </div>

            {/* Right Content - Enhanced Frog Illustration */}
            <div className="relative">
              <div className="relative p-8">
                {/* Cute Frog SVG */}
                <div className="w-full max-w-lg mx-auto">
                  <img
                    src={FrogBook}
                    alt="Frog Reading a Book"
                    className="w-full h-auto rounded-3xl"
                  />
                </div>
                {/* Improved Floating speech bubbles - closer and more languages */}
                <div className="absolute top-8 left-8 bg-gradient-to-r from-white via-emerald-50 to-green-100 rounded-xl px-4 py-2 shadow-lg border border-emerald-100/60">
                  <span className="text-sm font-medium text-emerald-700">
                    ¡Hola!
                  </span>
                </div>
                <div className="absolute top-20 right-8 bg-gradient-to-r from-white via-green-50 to-emerald-100 rounded-xl px-4 py-2 shadow-lg border border-green-100/60">
                  <span className="text-sm font-medium text-green-700">
                    Bonjour!
                  </span>
                </div>
                <div className="absolute bottom-16 left-24 bg-gradient-to-r from-white via-teal-50 to-green-100 rounded-xl px-4 py-2 shadow-lg border border-teal-100/60">
                  <span className="text-sm font-medium text-teal-700">
                    こんにちは!
                  </span>
                </div>
                <div className="absolute bottom-8 right-24 bg-gradient-to-r from-white via-yellow-50 to-orange-100 rounded-xl px-4 py-2 shadow-lg border border-yellow-100/60 ">
                  <span className="text-sm font-medium text-yellow-700">
                    नमस्ते!
                  </span>
                </div>
                <div className="absolute top-1/2 left-3 -translate-x-1/2 bg-gradient-to-r from-white via-pink-50 to-purple-100 rounded-xl px-4 py-2 shadow-lg border border-pink-100/60 ">
                  <span className="text-sm font-medium text-pink-700">
                    নমস্কার!
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Hero;