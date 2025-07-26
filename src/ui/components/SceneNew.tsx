import React, { useState, useEffect, useCallback } from 'react'
import { Button } from './ui/button'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'
import { Input } from './ui/input'
import { Progress } from './ui/progress'
import { Badge } from './ui/badge'
import { 
  Mic, 
  MicOff, 
  Play, 
  Volume2, 
  Loader2,
  SkipForward,
  RotateCcw,
  Home,
  ArrowLeft,
  Trophy,
  Sparkles,
  Heart,
  Star,
  CheckCircle,
  Brain
} from 'lucide-react'
import { toast } from 'sonner'
import { Link } from 'react-router-dom'
import FeedbackPage from './FeedbackPage'

// Types matching the backend API response
interface ScriptLine {
  scriptLineId: number
  order: number
  speaker: string
  text: string
  answer: string
  voiceUrl: string
  voiceId: string
}

interface SceneData {
  sceneId: number
  title: string
  description: string
  language: string
  createdAt: string
  scriptLines: ScriptLine[]
}

const Scene: React.FC = () => {
  const [language, setLanguage] = useState('')
  const [isGenerating, setIsGenerating] = useState(false)
  const [sceneData, setSceneData] = useState<SceneData | null>(null)
  const [currentLineIndex, setCurrentLineIndex] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const [isRecording, setIsRecording] = useState(false)
  const [userResponse, setUserResponse] = useState('')
  const [isWaitingForResponse, setIsWaitingForResponse] = useState(false)
  const [currentAudio, setCurrentAudio] = useState<HTMLAudioElement | null>(null)
  const [showFeedback, setShowFeedback] = useState(false)
  const [sceneCompleted, setSceneCompleted] = useState(false)

  const currentLine = sceneData?.scriptLines[currentLineIndex]
  const progress = sceneData ? ((currentLineIndex + 1) / sceneData.scriptLines.length) * 100 : 0
  const isLastLine = sceneData ? currentLineIndex >= sceneData.scriptLines.length - 1 : false

  // Generate scene and redirect to practice
  const handleGenerateScene = async () => {
    if (!language.trim()) {
      toast.error('Please enter a language')
      return
    }

    setIsGenerating(true)
    try {
      // POST request to generate scene
      const response = await fetch('http://localhost:8000/scene', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ language: language.trim() }),
      })

      if (!response.ok) {
        throw new Error('Failed to generate scene')
      }

      const data = await response.json()
      console.log('Scene generated:', data)
      
      toast.success(`Scene Generated! "${data.title}" is ready to practice`)

      // Fetch the generated scene data and start practice
      await fetchAndStartPractice()

    } catch (error) {
      console.error('Error generating scene:', error)
      toast.error('Generation Failed: Failed to generate scene. Please try again.')
    } finally {
      setIsGenerating(false)
    }
  }

  // Fetch scene data and start practice
  const fetchAndStartPractice = async () => {
    try {
      const response = await fetch('http://localhost:8000/scene', {
        method: 'GET',
      })

      if (!response.ok) {
        throw new Error('Failed to fetch scene')
      }

      const data: SceneData = await response.json()
      console.log('Scene fetched:', data)
      
      setSceneData(data)
      setCurrentLineIndex(0)
      setUserResponse('')
      setIsWaitingForResponse(false)
      setSceneCompleted(false)

    } catch (error) {
      console.error('Error fetching scene:', error)
      toast.error('Failed to load scene. Please try again.')
    }
  }

  // Handle audio playback
  const handlePlay = useCallback(async () => {
    if (!currentLine?.voiceUrl || isPlaying) return

    try {
      // Stop any currently playing audio
      if (currentAudio) {
        currentAudio.pause()
        currentAudio.currentTime = 0
      }

      setIsPlaying(true)
      const audio = new Audio(currentLine.voiceUrl)
      setCurrentAudio(audio)

      audio.onended = () => {
        setIsPlaying(false)
        setCurrentAudio(null)
        // Start waiting for user response after audio finishes
        setIsWaitingForResponse(true)
      }

      audio.onerror = (e) => {
        console.error('Audio playback error:', e)
        setIsPlaying(false)
        setCurrentAudio(null)
        toast.error('Failed to play audio')
      }

      await audio.play()
    } catch (error) {
      console.error('Error playing audio:', error)
      setIsPlaying(false)
      setCurrentAudio(null)
      toast.error('Failed to play audio')
    }
  }, [currentLine?.voiceUrl, currentAudio, isPlaying])

  // Handle recording (dummy function)
  const handleRecord = useCallback(() => {
    if (isRecording) {
      // Stop recording
      setIsRecording(false)
      toast.info('Recording stopped')
    } else {
      // Start recording
      setIsRecording(true)
      setUserResponse('')
      setIsWaitingForResponse(false)
      toast.info('Recording started')
    }
  }, [isRecording])

  // Handle next line
  const handleNext = useCallback(() => {
    if (!sceneData) return

    if (currentLineIndex < sceneData.scriptLines.length - 1) {
      setCurrentLineIndex(prev => prev + 1)
      setUserResponse('')
      setIsWaitingForResponse(false)
      toast.success('Moving to next line!')
    } else {
      // Scene completed
      setSceneCompleted(true)
      toast.success('Scene completed! Great job!')
    }
  }, [sceneData, currentLineIndex])

  // Reset scene
  const resetScene = useCallback(() => {
    setCurrentLineIndex(0)
    setUserResponse('')
    setIsWaitingForResponse(false)
    setSceneCompleted(false)
    if (currentAudio) {
      currentAudio.pause()
      currentAudio.currentTime = 0
    }
    setCurrentAudio(null)
    setIsPlaying(false)
    setIsRecording(false)
    toast.info('Scene reset to beginning')
  }, [currentAudio])

  // Handle feedback
  const handleGetFeedback = useCallback(() => {
    setShowFeedback(true)
  }, [])

  const handleBackFromFeedback = useCallback(() => {
    setShowFeedback(false)
  }, [])

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (currentAudio) {
        currentAudio.pause()
        currentAudio.onended = null
        currentAudio.onerror = null
      }
    }
  }, [currentAudio])

  // Show feedback page if requested
  if (showFeedback && sceneData) {
    return (
      <FeedbackPage
        sceneTitle={sceneData.title}
        language={sceneData.language}
        onBack={handleBackFromFeedback}
      />
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50">
      {/* Background pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(69,187,25,0.08),transparent_50%)] pointer-events-none"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(16,185,129,0.08),transparent_50%)] pointer-events-none"></div>
      
      {/* Navigation Header */}
      <div className="relative z-10 p-6">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Link to="/home" className="group">
            <button className="group relative bg-white/90 backdrop-blur-sm text-[#45BB19] px-6 py-3 rounded-xl font-semibold shadow-lg hover:shadow-green-500/20 transition-all duration-300 hover:scale-105 border border-green-100/40">
              {/* Glossy overlay effect */}
              <div className="absolute inset-0 bg-gradient-to-b from-white/40 via-white/20 to-transparent rounded-xl"></div>
              <div className="absolute top-0 left-0 right-0 h-1/2 bg-gradient-to-b from-white/30 to-transparent rounded-t-xl"></div>
              
              <span className="relative flex items-center">
                <Home className="mr-2 h-5 w-5 group-hover:scale-110 transition-transform" />
                Back to Home
              </span>
            </button>
          </Link>
          
          <h1 className="text-3xl font-bold bg-gradient-to-r from-[#45BB19] via-emerald-500 to-green-600 bg-clip-text text-transparent">
            🐸 Practice Scene
          </h1>
          
          <div className="w-32"></div> {/* Spacer for centering */}
        </div>
      </div>

      <div className="relative z-10 px-4 sm:px-6 lg:px-8 pb-24">
        <div className="max-w-6xl mx-auto">
          {!sceneData ? (
            // Language Input Section
            <div className="max-w-2xl mx-auto mt-12">
              <Card className="bg-white/80 backdrop-blur-sm border-green-200/50 shadow-2xl">
                <CardHeader className="text-center pb-6">
                  <CardTitle className="text-3xl font-bold bg-gradient-to-r from-[#45BB19] via-emerald-500 to-green-600 bg-clip-text text-transparent">
                    🎭 Practice Scene Generator
                  </CardTitle>
                  <p className="text-gray-600 mt-2">
                    Enter a language to generate an interactive conversation scene
                  </p>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-3">
                    <label htmlFor="language" className="block text-sm font-semibold text-gray-700">
                      Target Language
                    </label>
                    <Input
                      id="language"
                      type="text"
                      value={language}
                      onChange={(e) => setLanguage(e.target.value)}
                      placeholder="e.g., Spanish, French, German, Japanese..."
                      className="text-lg p-4 border-2 border-green-200 focus:border-[#45BB19] rounded-xl transition-colors"
                      disabled={isGenerating}
                    />
                  </div>

                  <Button
                    onClick={handleGenerateScene}
                    disabled={!language.trim() || isGenerating}
                    className="w-full relative bg-gradient-to-r from-[#45BB19] to-emerald-600 hover:from-emerald-600 hover:to-green-700 text-white px-8 py-4 rounded-xl font-bold text-lg shadow-lg hover:shadow-green-500/25 transition-all duration-300 hover:scale-105 border border-green-400/40"
                  >
                    {/* Glossy overlay effect */}
                    <div className="absolute inset-0 bg-gradient-to-b from-white/30 via-white/10 to-transparent rounded-xl"></div>
                    <div className="absolute top-0 left-0 right-0 h-1/2 bg-gradient-to-b from-white/20 to-transparent rounded-t-xl"></div>
                    
                    <span className="relative flex items-center justify-center">
                      {isGenerating ? (
                        <>
                          <Loader2 className="mr-3 h-5 w-5 animate-spin" />
                          Generating Scene...
                        </>
                      ) : (
                        <>
                          <Sparkles className="mr-3 h-5 w-5" />
                          Generate Practice Scene
                        </>
                      )}
                    </span>
                  </Button>

                  {isGenerating && (
                    <div className="text-center py-4">
                      <div className="animate-pulse text-green-600 font-semibold">
                        🎬 Creating your personalized conversation scene...
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          ) : (
            // Scene Practice Interface
            <div className="space-y-6">
              {/* Scene Header */}
              <Card className="bg-white/80 backdrop-blur-sm border-green-200/50 shadow-lg">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-2xl font-bold bg-gradient-to-r from-[#45BB19] to-emerald-600 bg-clip-text text-transparent">
                      🎭 {sceneData.title}
                    </CardTitle>
                    <Badge variant="secondary" className="bg-green-100 text-green-700 font-semibold">
                      {sceneData.language}
                    </Badge>
                  </div>
                  <p className="text-gray-600 mt-2">{sceneData.description}</p>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between text-sm">
                      <span className="font-medium text-gray-700">
                        Line {currentLineIndex + 1} of {sceneData.scriptLines.length}
                      </span>
                      <span className="font-bold text-green-600">
                        {Math.round(progress)}% Complete
                      </span>
                    </div>
                    <Progress 
                      value={progress} 
                      className="h-2 bg-green-100"
                    />
                    {isLastLine && (
                      <div className="text-center text-green-600 font-semibold animate-pulse">
                        🎉 Final line! You're almost done!
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Content Display */}
                <Card className="bg-white/90 backdrop-blur-sm shadow-lg border border-green-100/40 rounded-2xl overflow-hidden">
                  <CardHeader className="py-3 border-b border-green-100/30">
                    <CardTitle className="flex items-center gap-2 text-lg font-bold text-gray-800">
                      <Volume2 className="h-5 w-5 text-[#45BB19]" />
                      {currentLine?.speaker} - Line {currentLine?.order}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-4 space-y-3">
                    {/* TTS Section - Compact */}
                    <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-4 rounded-xl border border-blue-200">
                      <div className="flex items-center gap-2 mb-2">
                        <Volume2 className="h-4 w-4 text-blue-600" />
                        <span className="text-sm font-bold text-blue-700">🔊 TTS Says</span>
                        <Badge className="bg-blue-500 text-white text-xs">Listen</Badge>
                      </div>
                      <p className="text-lg font-medium text-gray-800 bg-white/80 p-3 rounded-lg">
                        "{currentLine?.text}"
                      </p>
                    </div>

                    {/* User Section - Compact */}
                    <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-4 rounded-xl border border-green-300">
                      <div className="flex items-center gap-2 mb-2">
                        <Mic className="h-4 w-4 text-green-600" />
                        <span className="text-sm font-bold text-green-700">🎤 You Say</span>
                        <Badge className="bg-green-500 text-white text-xs animate-pulse">Your Turn</Badge>
                      </div>
                      <p className="text-lg font-bold text-gray-800 bg-gradient-to-r from-green-100 to-emerald-100 p-3 rounded-lg border border-green-200">
                        "{currentLine?.answer}"
                      </p>
                    </div>

                    {/* User Response Display */}
                    {userResponse && (
                      <div className="bg-gradient-to-r from-yellow-50 to-orange-50 p-4 rounded-xl border border-yellow-200">
                        <div className="flex items-center gap-2 mb-2">
                          <span className="text-sm font-bold text-orange-700">
                            ✅ Your Response:
                          </span>
                        </div>
                        <p className="text-base font-semibold text-gray-800 bg-white/80 p-3 rounded-lg">
                          {userResponse}
                        </p>
                      </div>
                    )}

                    {/* Waiting State */}
                    {isWaitingForResponse && (
                      <div className="text-center py-4">
                        <div className="animate-pulse text-green-600 font-semibold">
                          🎤 Waiting for your response...
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>

                {/* Recording Section */}
                <Card className="bg-white/80 backdrop-blur-sm border-green-200/50 shadow-lg">
                  <CardHeader>
                    <CardTitle className="text-lg font-bold text-gray-800 flex items-center">
                      🎙️ Practice & Record
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {/* Audio Control */}
                    <div className="flex items-center space-x-3">
                      <Button
                        onClick={handlePlay}
                        disabled={isPlaying}
                        className="relative bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white px-6 py-3 rounded-xl font-semibold shadow-lg hover:shadow-blue-500/20 transition-all duration-300 hover:scale-105 border border-blue-400/40"
                      >
                        <div className="absolute inset-0 bg-gradient-to-b from-white/30 via-white/10 to-transparent rounded-xl"></div>
                        <span className="relative flex items-center">
                          {isPlaying ? (
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          ) : (
                            <Play className="mr-2 h-4 w-4" />
                          )}
                          {isPlaying ? 'Playing...' : 'Listen'}
                        </span>
                      </Button>

                      <Button
                        onClick={handleRecord}
                        disabled={false}
                        className={`relative ${
                          isRecording 
                            ? 'bg-gradient-to-r from-red-500 to-red-600' 
                            : 'bg-gradient-to-r from-[#45BB19] to-emerald-600'
                        } hover:scale-105 text-white px-6 py-3 rounded-xl font-semibold shadow-lg transition-all duration-300 border border-opacity-40`}
                      >
                        <div className="absolute inset-0 bg-gradient-to-b from-white/30 via-white/10 to-transparent rounded-xl"></div>
                        <span className="relative flex items-center">
                          {isRecording ? (
                            <MicOff className="mr-2 h-4 w-4 animate-pulse" />
                          ) : (
                            <Mic className="mr-2 h-4 w-4" />
                          )}
                          {isRecording ? 'Stop Recording' : 'Start Recording'}
                        </span>
                      </Button>
                    </div>

                    {/* Recording Status */}
                    {isRecording && (
                      <div className="bg-red-50 border border-red-200 rounded-xl p-3 flex items-center space-x-3">
                        <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
                        <span className="text-sm font-bold">Recording... </span>
                        <div className="flex space-x-1">
                          <div className="w-1 h-4 bg-green-400 rounded animate-pulse delay-100"></div>
                          <div className="w-1 h-6 bg-green-500 rounded animate-pulse delay-200"></div>
                          <div className="w-1 h-4 bg-green-400 rounded animate-pulse delay-300"></div>
                        </div>
                      </div>
                    )}

                    {/* Transcript Display */}
                    {userResponse && (
                      <div className="bg-white/90 border border-green-200 rounded-xl p-3 shadow-sm">
                        <p className="text-xs font-medium text-gray-600 mb-2">
                          ✅ Recorded:
                        </p>
                        <p className="text-base font-semibold text-gray-800 bg-gradient-to-r from-emerald-50 to-green-50 p-2 rounded">
                          {userResponse}
                        </p>
                      </div>
                    )}

                    {/* Action Buttons */}
                    <div className="flex space-x-3 pt-3">
                      <Button
                        onClick={handleNext}
                        disabled={false}
                        className="relative bg-gradient-to-r from-[#45BB19] to-emerald-600 hover:from-emerald-600 hover:to-green-700 text-white px-6 py-3 rounded-xl font-semibold shadow-lg hover:shadow-green-500/20 transition-all duration-300 hover:scale-105 border border-green-400/40 flex-1"
                      >
                        <div className="absolute inset-0 bg-gradient-to-b from-white/30 via-white/10 to-transparent rounded-xl"></div>
                        <span className="relative flex items-center justify-center">
                          <SkipForward className="mr-2 h-4 w-4" />
                          Next Line
                        </span>
                      </Button>

                      <Button
                        onClick={resetScene}
                        variant="outline"
                        className="relative bg-white/90 text-gray-700 border-gray-300 hover:bg-gray-50 px-4 py-3 rounded-xl font-semibold shadow transition-all duration-300 hover:scale-105"
                      >
                        <div className="absolute inset-0 bg-gradient-to-b from-white/40 via-white/20 to-transparent rounded-xl"></div>
                        <span className="relative flex items-center">
                          <RotateCcw className="mr-2 h-4 w-4" />
                          Reset
                        </span>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Scene Completion */}
              {sceneCompleted && (
                <Card className="bg-gradient-to-br from-green-50 to-emerald-100 border-green-300 shadow-xl animate-in fade-in duration-500 mb-24">
                  <CardContent className="p-8 text-center">
                    <div className="space-y-6">
                      {/* Success Animation */}
                      <div className="relative">
                        <div className="text-6xl animate-bounce">🎉</div>
                        <div className="absolute -top-2 -right-2 text-2xl animate-pulse">
                          <Sparkles className="h-6 w-6 text-yellow-500" />
                        </div>
                        <div className="absolute -top-2 -left-2 text-2xl animate-pulse delay-150">
                          <Star className="h-6 w-6 text-yellow-400" />
                        </div>
                      </div>

                      {/* Success Message */}
                      <div className="space-y-3">
                        <h2 className="text-3xl font-bold bg-gradient-to-r from-[#45BB19] via-emerald-500 to-green-600 bg-clip-text text-transparent">
                          Congratulations!
                        </h2>
                        <p className="text-lg text-gray-700 font-semibold">
                          You've completed "{sceneData.title}"
                        </p>
                        <div className="flex items-center justify-center space-x-2 text-red-500">
                          <Heart className="h-5 w-5 animate-pulse" />
                          <span className="font-medium">Great job practicing!</span>
                          <Heart className="h-5 w-5 animate-pulse delay-75" />
                        </div>
                      </div>

                      {/* Stats */}
                      <div className="bg-white/80 rounded-xl p-4 border border-green-200">
                        <div className="flex items-center justify-center space-x-6">
                          <div className="text-center">
                            <Trophy className="h-8 w-8 text-yellow-500 mx-auto mb-2" />
                            <p className="text-sm font-bold text-gray-700">Scene Complete</p>
                          </div>
                          <div className="text-center">
                            <div className="text-2xl font-bold text-[#45BB19] mb-1">100%</div>
                            <p className="text-sm font-bold text-gray-700">Progress</p>
                          </div>
                        </div>
                      </div>

                      {/* Action Buttons */}
                      <div className="flex space-x-4">
                        <Button
                          onClick={handleGetFeedback}
                          className="relative bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white px-8 py-4 rounded-xl font-bold text-lg shadow-lg hover:shadow-blue-500/25 transition-all duration-300 hover:scale-105 border border-blue-400/40 flex-1"
                        >
                          <div className="absolute inset-0 bg-gradient-to-b from-white/30 via-white/10 to-transparent rounded-xl"></div>
                          <span className="relative flex items-center justify-center">
                            <Brain className="mr-3 h-5 w-5" />
                            Get AI Feedback
                          </span>
                        </Button>

                        <Button
                          onClick={resetScene}
                          className="relative bg-gradient-to-r from-[#45BB19] to-emerald-600 hover:from-emerald-600 hover:to-green-700 text-white px-8 py-4 rounded-xl font-bold text-lg shadow-lg hover:shadow-green-500/25 transition-all duration-300 hover:scale-105 border border-green-400/40 flex-1"
                        >
                          <div className="absolute inset-0 bg-gradient-to-b from-white/30 via-white/10 to-transparent rounded-xl"></div>
                          <span className="relative flex items-center justify-center">
                            <RotateCcw className="mr-3 h-5 w-5" />
                            Practice Again
                          </span>
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Scene
