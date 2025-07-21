"use client"

import { useState, useEffect } from "react"
import { Eye, EyeOff, ArrowRight, User, Mail, Lock } from "lucide-react"
import { Link } from "react-router-dom"
import FrogWave from "/images/frog-wave.png"

interface SignUpProps {
    toggleState: React.Dispatch<React.SetStateAction<boolean>>
}

const SignUp = ({toggleState}:SignUpProps) => {
  const [isVisible, setIsVisible] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: ""
  })

  useEffect(() => {
    setIsVisible(true)
  }, [])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Form submitted:", formData)
    // AXIOS
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-green-50/50 to-emerald-50/70 overflow-hidden relative">
      {/* Floating Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Original floating elements */}
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
      </div>

      {/* Main Content */}
      <div className="relative z-10 flex items-center justify-center min-h-screen px-4 sm:px-6 lg:px-8 py-12">
        
        {/* Back to Home Link - Top Left */}
        <Link 
          to="/" 
          className="absolute top-6 left-6 inline-flex items-center text-green-500 hover:text-green-600 font-fredoka font-semibold transition-colors duration-300 z-30"
        >
          ← Back to Home
        </Link>
        
        {/* Container for Frog and Form - Side by Side */}
        <div className="flex flex-col lg:flex-row items-center justify-center max-w-6xl mx-auto w-full gap-6 lg:gap-12 relative">
          
          {/* Frog Character with Thinking Cloud - Mobile: Lower Right, Desktop: Left Side */}
          <div
            className={`flex-shrink-0 transform transition-all duration-1000 delay-300 ${isVisible ? "translate-x-0 opacity-100" : "-translate-x-8 opacity-0"} 
            lg:relative lg:block 
            fixed bottom-4 right-4 lg:bottom-auto lg:right-auto z-20 lg:z-auto`}
          >
            <div className="relative">
              {/* Thinking Cloud - Hidden on mobile, visible on desktop */}
              <div className="hidden lg:block absolute m-12 -top-32 sm:-top-40 -right-8 sm:-right-16 z-20">
                <div className="relative bg-white rounded-3xl p-4 sm:p-6 shadow-xl border border-green-100 w-72 sm:w-80">
                  {/* Cloud tail pointing to frog */}
                  <div className="absolute bottom-0 left-12 sm:left-16 w-0 h-0 border-l-[20px] border-r-[20px] border-t-[20px] border-l-transparent border-r-transparent border-t-white transform translate-y-full"></div>
                  <div className="absolute bottom-0 left-10 sm:left-14 w-0 h-0 border-l-[12px] border-r-[12px] border-t-[12px] border-l-transparent border-r-transparent border-t-white transform translate-y-[12px]"></div>
                  
                  <p className="text-base sm:text-lg text-gray-700 font-fredoka font-medium leading-relaxed">
                    Ready to hop into a world of languages? Let's make learning fun and ribbiting! 
                  </p>
                </div>
              </div>
              
              {/* Big Frog Image - Bigger on mobile */}
              <div className="relative group">
                <div className="absolute m-12 inset-0 bg-gradient-to-r from-green-300/40 to-emerald-400/40 rounded-full blur-2xl opacity-50 group-hover:opacity-70 transition-opacity duration-500 scale-125"></div>
                <img
                  src={FrogWave}
                  alt="Friendly Frog Waving"
                  className="relative w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48 lg:w-64 lg:h-64 xl:w-80 xl:h-80 2xl:w-96 2xl:h-96 object-contain drop-shadow-2xl group-hover:scale-105 transition-transform duration-500"
                  style={{ 
                    filter: 'drop-shadow(0px 16px 32px rgba(34, 197, 94, 0.3))'
                  }}
                />
              </div>
              
              {/* Enhanced Floating sparkles around big frog - Hidden on mobile */}
              <div className="hidden lg:block absolute top-4 sm:top-8 right-4 sm:right-8 text-green-400 animate-bounce text-2xl sm:text-3xl" style={{ animationDelay: '0s', animationDuration: '2s' }}>✨</div>
              <div className="hidden lg:block absolute bottom-12 sm:bottom-16 right-2 sm:right-4 text-emerald-300 animate-bounce text-2xl sm:text-3xl" style={{ animationDelay: '0.5s', animationDuration: '2.5s' }}>🌟</div>
             
            </div>
          </div>

          {/* Sign Up Form - Centered on mobile, Right Side on desktop */}
          <div
            className={`flex-shrink-0 transform transition-all duration-1000 delay-500 ${isVisible ? "translate-x-0 opacity-100" : "translate-x-8 opacity-0"} w-full max-w-md lg:max-w-lg mx-auto lg:mx-0`}
          >
            <div className="relative group">
              {/* Form Background with Glossy Effect */}
              <div className="absolute inset-0 bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl"></div>
              <div className="absolute inset-0 bg-gradient-to-br from-white/70 via-white/30 to-white/10 rounded-3xl"></div>
              <div className="absolute top-0 left-0 w-3/4 h-1/2 bg-gradient-to-br from-white/50 to-transparent rounded-tl-3xl"></div>
              
              <div className="relative p-6 sm:p-8 lg:p-10 w-full">
                {/* Title */}
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-center mb-2 bg-gradient-to-r from-green-400 via-emerald-400 to-green-500 bg-clip-text text-transparent font-fredoka-heading">
                  Join LangQuest
                </h2>
                <p className="text-gray-600 text-center mb-6 sm:mb-8 font-fredoka text-base sm:text-lg">
                  Start your language learning adventure
                </p>

                <form onSubmit={handleSubmit} className="space-y-5 sm:space-y-6">
                  {/* Full Name Input */}
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 sm:pl-5 flex items-center pointer-events-none">
                      <User className="h-5 w-5 sm:h-6 sm:w-6 text-green-400" />
                    </div>
                    <input
                      type="text"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleInputChange}
                      placeholder="Full Name"
                      className="w-full pl-12 sm:pl-14 pr-4 sm:pr-5 py-4 sm:py-5 bg-white/80 border-2 border-green-100 rounded-xl sm:rounded-2xl focus:border-green-400 focus:ring-0 focus:outline-none transition-all duration-300 placeholder-gray-500 font-fredoka shadow-inner text-base sm:text-lg"
                      required
                    />
                  </div>

                  {/* Email Input */}
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 sm:pl-5 flex items-center pointer-events-none">
                      <Mail className="h-5 w-5 sm:h-6 sm:w-6 text-green-400" />
                    </div>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="Email Address"
                      className="w-full pl-12 sm:pl-14 pr-4 sm:pr-5 py-4 sm:py-5 bg-white/80 border-2 border-green-100 rounded-xl sm:rounded-2xl focus:border-green-400 focus:ring-0 focus:outline-none transition-all duration-300 placeholder-gray-500 font-fredoka shadow-inner text-base sm:text-lg"
                      required
                    />
                  </div>

                  {/* Password Input */}
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 sm:pl-5 flex items-center pointer-events-none">
                      <Lock className="h-5 w-5 sm:h-6 sm:w-6 text-green-400" />
                    </div>
                    <input
                      type={showPassword ? "text" : "password"}
                      name="password"
                      value={formData.password}
                      onChange={handleInputChange}
                      placeholder="Password"
                      className="w-full pl-12 sm:pl-14 pr-12 sm:pr-14 py-4 sm:py-5 bg-white/80 border-2 border-green-100 rounded-xl sm:rounded-2xl focus:border-green-400 focus:ring-0 focus:outline-none transition-all duration-300 placeholder-gray-500 font-fredoka shadow-inner text-base sm:text-lg"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute inset-y-0 right-0 pr-4 sm:pr-5 flex items-center"
                    >
                      {showPassword ? (
                        <EyeOff className="h-5 w-5 sm:h-6 sm:w-6 text-gray-400 hover:text-green-400 transition-colors" />
                      ) : (
                        <Eye className="h-5 w-5 sm:h-6 sm:w-6 text-gray-400 hover:text-green-400 transition-colors" />
                      )}
                    </button>
                  </div>

                  {/* Confirm Password Input */}
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 sm:pl-5 flex items-center pointer-events-none">
                      <Lock className="h-5 w-5 sm:h-6 sm:w-6 text-green-400" />
                    </div>
                    <input
                      type={showConfirmPassword ? "text" : "password"}
                      name="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleInputChange}
                      placeholder="Confirm Password"
                      className="w-full pl-12 sm:pl-14 pr-12 sm:pr-14 py-4 sm:py-5 bg-white/80 border-2 border-green-100 rounded-xl sm:rounded-2xl focus:border-green-400 focus:ring-0 focus:outline-none transition-all duration-300 placeholder-gray-500 font-fredoka shadow-inner text-base sm:text-lg"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute inset-y-0 right-0 pr-4 sm:pr-5 flex items-center"
                    >
                      {showConfirmPassword ? (
                        <EyeOff className="h-5 w-5 sm:h-6 sm:w-6 text-gray-400 hover:text-green-400 transition-colors" />
                      ) : (
                        <Eye className="h-5 w-5 sm:h-6 sm:w-6 text-gray-400 hover:text-green-400 transition-colors" />
                      )}
                    </button>
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    className="w-full group relative px-8 sm:px-10 py-4 sm:py-5 bg-gradient-to-b from-green-400 via-emerald-500 to-green-600 text-white font-bold text-lg sm:text-xl rounded-xl sm:rounded-2xl shadow-2xl hover:shadow-green-400/40 transition-all duration-300 hover:scale-105 overflow-hidden tracking-wider font-fredoka mt-8 sm:mt-10"
                  >
                    {/* Enhanced Glossy overlay effect */}
                    <div className="absolute inset-0 bg-gradient-to-br from-white/70 via-white/30 to-white/5 rounded-xl sm:rounded-2xl"></div>
                    <div className="absolute top-0 left-0 w-3/4 h-1/2 bg-gradient-to-br from-white/50 to-transparent rounded-tl-xl sm:rounded-tl-2xl"></div>
                    {/* Hover effect */}
                    <div className="absolute inset-0 bg-gradient-to-r from-emerald-300 to-green-300 opacity-0 group-hover:opacity-20 transition-opacity duration-300 rounded-xl sm:rounded-2xl"></div>
                    {/* Inner shadow for depth */}
                    <div className="absolute inset-0 rounded-xl sm:rounded-2xl shadow-inner shadow-black/10"></div>
                    <span className="relative flex items-center justify-center">
                      Create Account
                      <ArrowRight className="ml-3 sm:ml-4 w-5 h-5 sm:w-6 sm:h-6 group-hover:translate-x-1 transition-transform duration-300" />
                    </span>
                  </button>
                </form>

                {/* Sign In Link */}
                <div className="text-center mt-6 sm:mt-8">
                  <p className="text-gray-600 font-fredoka text-base sm:text-lg">
                    Already have an account?{" "}
                    <p onClick={() => toggleState(false)}
                      className="text-green-500 hover:text-green-600 font-semibold transition-colors duration-300"
                    >
                      Sign In
                    </p>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SignUp
