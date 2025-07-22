import { useState, useEffect } from "react"
import { Eye, EyeOff, ArrowRight, Mail, Lock } from "lucide-react"
import { Link, useNavigate } from "react-router-dom"
import FrogFront from "/images/frog-front.png"
import store from '../../utils/electron-store'
import { useUser } from "@/ui/lib/contextStores/userStore"
import BackToHome from "../Buttons/BackToHome"

interface SignInProps {
    toggleState: React.Dispatch<React.SetStateAction<boolean>>
}

const SignIn = ({toggleState}:SignInProps) => {
  const navigate = useNavigate();
  const [isVisible, setIsVisible] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const {userData} = useUser()
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  })
  useEffect(() => {
    setIsVisible(true)
  }, [])
  
  useEffect(() => {
    if (userData?.isLoggedIn) {
      navigate("/home");
    }
  }, [])


  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    
    try {
      console.log("Sign in form submitted:", formData)
      await new Promise(resolve => setTimeout(resolve, 1000))
      await saveUserDataToStore(formData)

      navigate("/home");
    } catch (error) {
      console.error('Sign in error:', error)
      alert('Sign in failed. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  const saveUserDataToStore = async (formData: any) => {
    try {
      
      await store.set('lastSignedInEmail', formData.email)
      await store.set('username', formData.email)
      await store.set('lastSignInTime', new Date().toISOString())
      await store.set('isLoggedIn', true)
      console.log('User data saved to store:', {
        email: formData.email,
        username: formData.username
      })
      
    } catch (error) {
      console.error('Error saving user data to store:', error)
    }
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
        
        <BackToHome/>
        
        {/* Container for Frog and Form - Side by Side */}
        <div className="flex flex-col lg:flex-row items-center justify-center max-w-6xl mx-auto w-full gap-10 lg:gap-24 relative">
          
          {/* Frog Character - Mobile: Lower Right, Desktop: Left Side */}
          <div
            className={`flex-shrink-0 transform transition-all duration-1000 delay-300 ${isVisible ? "translate-x-0 opacity-100" : "-translate-x-8 opacity-0"} 
            lg:relative lg:block 
            fixed bottom-4 right-4 lg:bottom-auto lg:right-auto z-20 lg:z-auto`}
          >
            <div className="relative">
              {/* Thinking Cloud - Hidden on mobile, visible on desktop */}
              <div className="hidden lg:block absolute -top-32 sm:-top-40 -right-8 sm:-right-16 z-20">
                <div className="relative bg-white rounded-3xl p-4 sm:p-6 shadow-xl border border-green-100 w-72 sm:w-80">
                  {/* Cloud tail pointing to frog */}
                  <div className="absolute bottom-0 left-12 sm:left-16 w-0 h-0 border-l-[20px] border-r-[20px] border-t-[20px] border-l-transparent border-r-transparent border-t-white transform translate-y-full"></div>
                  <div className="absolute bottom-0 left-10 sm:left-14 w-0 h-0 border-l-[12px] border-r-[12px] border-t-[12px] border-l-transparent border-r-transparent border-t-white transform translate-y-[12px]"></div>
                  
                  <p className="text-base sm:text-lg text-gray-700 font-fredoka font-medium leading-relaxed">
                     Welcome back! Ready to continue your amazing language journey with us? Let's dive in!
                  </p>
                </div>
              </div>
              
              {/* Frog Image - Different size for mobile and desktop */}
              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-r from-green-300/40 to-emerald-400/40 rounded-full blur-2xl opacity-50 group-hover:opacity-70 transition-opacity duration-500 scale-125"></div>
                <img
                  src={FrogFront}
                  alt="Friendly Frog"
                  className="relative w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48 lg:w-64 lg:h-64 xl:w-80 xl:h-80 2xl:w-96 2xl:h-96 object-contain drop-shadow-2xl group-hover:scale-105 transition-transform duration-500"
                  style={{ 
                    filter: 'drop-shadow(0px 16px 32px rgba(34, 197, 94, 0.3))'
                  }}
                />
              </div>
              
              {/* Enhanced Floating sparkles around frog - Hidden on mobile */}
              
              <div className="hidden lg:block absolute bottom-12 sm:bottom-16 right-2 sm:right-4 text-emerald-300 animate-bounce text-2xl sm:text-3xl" style={{ animationDelay: '0.5s', animationDuration: '2.5s' }}>🌟</div>
              <div className="hidden lg:block absolute top-16 sm:top-20 left-2 sm:left-4 text-green-300 animate-bounce text-xl sm:text-2xl" style={{ animationDelay: '1s', animationDuration: '3s' }}>✨</div>
              
            </div>
          </div>

          {/* Sign In Form - Centered on mobile, Right Side on desktop */}
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
                  Welcome Back
                </h2>
                <p className="text-gray-600 text-center mb-6 sm:mb-8 font-fredoka text-base sm:text-lg">
                  Continue your language learning journey
                </p>

                <form onSubmit={handleSubmit} className="space-y-5 sm:space-y-6">
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

                  {/* Forgot Password Link */}
                  <div className="text-right">
                    <Link 
                      to="/forgot-password" 
                      className="text-green-500 hover:text-green-600 font-fredoka text-sm sm:text-base transition-colors duration-300"
                    >
                      Forgot Password?
                    </Link>
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isLoading}
                    className={`w-full group relative px-8 sm:px-10 py-4 sm:py-5 bg-gradient-to-b from-green-400 via-emerald-500 to-green-600 text-white font-bold text-lg sm:text-xl rounded-xl sm:rounded-2xl shadow-2xl hover:shadow-green-400/40 transition-all duration-300 hover:scale-105 overflow-hidden tracking-wider font-fredoka mt-8 sm:mt-10 ${isLoading ? 'opacity-70 cursor-not-allowed' : ''}`}
                  >
                    {/* Enhanced Glossy overlay effect */}
                    <div className="absolute inset-0 bg-gradient-to-br from-white/70 via-white/30 to-white/5 rounded-xl sm:rounded-2xl"></div>
                    <div className="absolute top-0 left-0 w-3/4 h-1/2 bg-gradient-to-br from-white/50 to-transparent rounded-tl-xl sm:rounded-tl-2xl"></div>
                    {/* Hover effect */}
                    <div className="absolute inset-0 bg-gradient-to-r from-emerald-300 to-green-300 opacity-0 group-hover:opacity-20 transition-opacity duration-300 rounded-xl sm:rounded-2xl"></div>
                    {/* Inner shadow for depth */}
                    <div className="absolute inset-0 rounded-xl sm:rounded-2xl shadow-inner shadow-black/10"></div>
                    <span className="relative flex items-center justify-center">
                      {isLoading ? (
                        <>
                          <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          Signing In...
                        </>
                      ) : (
                        <>
                          Sign In
                          <ArrowRight className="ml-3 sm:ml-4 w-5 h-5 sm:w-6 sm:h-6 group-hover:translate-x-1 transition-transform duration-300" />
                        </>
                      )}
                    </span>
                  </button>
                </form>

                {/* Divider */}
                <div className="relative my-6 sm:my-8">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gray-200"></div>
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="px-4 bg-white/80 text-gray-500 font-fredoka rounded-full">
                      or continue with
                    </span>
                  </div>
                </div>

                {/* Social Sign In Options */}
                <div className="space-y-3">
                  <button className="w-full flex items-center justify-center px-4 py-3 sm:py-4 border-2 border-gray-100 rounded-xl sm:rounded-2xl hover:border-green-200 transition-all duration-300 bg-white/60 hover:bg-white/80 font-fredoka text-base sm:text-lg">
                    <svg className="w-5 h-5 mr-3" viewBox="0 0 24 24">
                      <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                      <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                      <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                      <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                    </svg>
                    Continue with Google
                  </button>
                  
                  <button className="w-full flex items-center justify-center px-4 py-3 sm:py-4 border-2 border-gray-100 rounded-xl sm:rounded-2xl hover:border-green-200 transition-all duration-300 bg-white/60 hover:bg-white/80 font-fredoka text-base sm:text-lg">
                    <svg className="w-5 h-5 mr-3" fill="#1877F2" viewBox="0 0 24 24">
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                    </svg>
                    Continue with Facebook
                  </button>
                </div>

                {/* Sign Up Link */}
                <div className="text-center mt-6 sm:mt-8"
                >
                  <div className="text-gray-600 font-fredoka text-base sm:text-lg">
                    Don't have an account?{" "}
                    <p onClick={() => toggleState(true)}
                      className="text-green-500 hover:text-green-600 font-semibold transition-colors duration-300"
                    >
                      Sign Up
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SignIn
