"use client"

import { useState, useEffect } from "react"
import { ArrowRight } from "lucide-react"
import Logo from "/images/Logo.png" // Ensure this path is correct for your project structure
import { Link } from "react-router-dom"

const LandingPage = () => {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-green-50/50 to-emerald-50/70 overflow-hidden relative">
      {/* Floating Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-green-300/30 to-emerald-400/30 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-gradient-to-tr from-green-200/25 to-emerald-300/25 rounded-full blur-3xl animate-pulse delay-1000"></div>
        
        {/* Fun animated blobs */}
        <div className="absolute top-20 left-20 w-48 h-48 bg-gradient-to-br from-emerald-300/20 to-green-400/15 rounded-full animate-bounce delay-500 blur-sm" style={{ animationDuration: '4s' }}></div>
        
        <div className="absolute top-1/3 right-16 w-40 h-56 bg-gradient-to-t from-green-300/25 to-emerald-200/20 rounded-full animate-pulse delay-700 transform rotate-12 blur-sm" style={{ animationDuration: '5s' }}></div>
        
        <div className="absolute bottom-32 left-1/4 w-44 h-44 bg-gradient-to-bl from-emerald-400/20 to-green-300/15 animate-bounce delay-1000 blur-md" style={{ 
          borderRadius: '60% 40% 30% 70% / 60% 30% 70% 40%',
          animationDuration: '6s'
        }}></div>
        
        <div className="absolute top-2/3 right-1/3 w-32 h-52 bg-gradient-to-l from-green-200/20 to-emerald-300/15 animate-pulse delay-300 transform -rotate-12 blur-sm" style={{ 
          borderRadius: '70% 30% 50% 50% / 40% 60% 40% 60%',
          animationDuration: '7s'
        }}></div>
        
        <div className="absolute bottom-20 right-20 w-52 h-36 bg-gradient-to-tr from-emerald-300/25 to-green-200/20 animate-bounce delay-200 transform rotate-45 blur-md" style={{ 
          borderRadius: '40% 60% 70% 30% / 50% 40% 60% 50%',
          animationDuration: '5.5s'
        }}></div>
        
        <div className="absolute top-1/2 left-16 w-28 h-64 bg-gradient-to-b from-green-300/20 to-emerald-400/15 animate-pulse delay-800 transform rotate-6 blur-sm" style={{ 
          borderRadius: '50% 50% 30% 70% / 60% 40% 60% 40%',
          animationDuration: '8s'
        }}></div>
        
        <div className="absolute top-16 right-1/3 w-60 h-32 bg-gradient-to-r from-emerald-200/15 to-green-300/20 animate-bounce delay-600 transform -rotate-6 blur-md" style={{ 
          borderRadius: '30% 70% 50% 50% / 40% 60% 40% 60%',
          animationDuration: '4.5s'
        }}></div>
      </div>
      {/* Main Content */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-6 text-center">
        {/* Logo Section */}
        <div
          className={`transform transition-all duration-1000 ${isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"}`}
        >
          <div className="relative group mb-12">
            <img
              src={Logo || "/placeholder.svg"}
              alt="LangQuest Logo"
              className="relative w-48 h-48 mx-auto rounded-full border-4 border-white/90 group-hover:scale-105 transition-transform duration-300"
              style={{ boxShadow: "0px 8px 32px rgba(34, 197, 94, 0.2), 0px 0px 0px 1px rgba(255, 255, 255, 0.8)" }}
            />
          </div>
        </div>
        {/* Welcome Text */}
        <div
          className={`transform transition-all duration-1000 delay-300 ${isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"}`}
        >
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-black mb-8 bg-gradient-to-r from-green-400 via-emerald-400 to-green-500 bg-clip-text text-transparent leading-tight font-fredoka-heading drop-shadow-sm">
            Welcome to LangQuest
          </h1>
        </div>
        {/* CTA Button */}
        <div
          className={`transform transition-all duration-1000 delay-600 ${isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"}`}
        >
          <Link to={"/signup"} className="group relative inline-block px-12 py-6 bg-gradient-to-b from-green-400 via-emerald-500 to-green-600 text-white font-bold text-xl rounded-2xl shadow-2xl hover:shadow-green-400/40 transition-all duration-300 hover:scale-105 overflow-hidden tracking-wider font-fredoka">
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
        </div>
      </div>
    </div>
  )
}

export default LandingPage
