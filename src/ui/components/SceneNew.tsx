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
  RotateCcw 
} from 'lucide-react'
import { toast } from 'sonner'
import { speechRecognitionService } from '../utils/speechRecognition'

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
  const [interimTranscript, setInterimTranscript] = useState('')
  const [isWaitingForResponse, setIsWaitingForResponse] = useState(false)
  const [currentAudio, setCurrentAudio] = useState<HTMLAudioElement | null>(null)

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
      setIsWaitingForResponse(false)
      
      // Don't automatically play audio - wait for user to click play button
      console.log('Scene loaded - ready for user interaction')

    } catch (error) {
      console.error('Error fetching scene:', error)
      toast.error('Failed to fetch scene data')
    }
  }

  // Play current line audio
  const playCurrentLine = useCallback(async () => {
    if (!currentLine || isPlaying) return

    // Stop any currently playing audio first
    if (currentAudio) {
      currentAudio.pause()
      currentAudio.currentTime = 0
      currentAudio.onended = null
      currentAudio.onerror = null
    }

    setIsPlaying(true)
    setIsWaitingForResponse(false)
    setIsRecording(false) // Stop any ongoing recording

    try {
      console.log('Playing audio:', currentLine.voiceUrl)
      const audio = new Audio(currentLine.voiceUrl)
      setCurrentAudio(audio)

      audio.onended = () => {
        setIsPlaying(false)
        setCurrentAudio(null)
        console.log('Audio ended - waiting for user action')
        // Don't automatically start recording - wait for user to click
      }

      audio.onerror = () => {
        setIsPlaying(false)
        setCurrentAudio(null)
        toast.error('Audio Error: Failed to play audio.')
      }

      await audio.play()
    } catch (error) {
      setIsPlaying(false)
      setCurrentAudio(null)
      console.error('Error playing audio:', error)
      toast.error('Playback Error: Could not play audio file')
    }
  }, [currentLine, isPlaying, currentAudio, isRecording])

  // Start recording user response
  const startRecording = async () => {
    if (!speechRecognitionService.isSupported()) {
      toast.error('Not Supported: Speech recognition is not supported in this browser')
      return
    }

    // Stop any playing audio before starting recording
    if (currentAudio && isPlaying) {
      currentAudio.pause()
      currentAudio.currentTime = 0
      setIsPlaying(false)
    }

    setIsRecording(true)
    setUserResponse('')
    setInterimTranscript('')
    setIsWaitingForResponse(true)

    try {
      await speechRecognitionService.startRecording(
        'en-US', // You can make this dynamic based on the scene language
        (transcript: string, isFinal: boolean) => {
          if (isFinal) {
            setUserResponse(transcript)
            setIsRecording(false)
            setInterimTranscript('')
            
            console.log('User response recorded:', transcript)
            toast.success(`Response Recorded: You said: "${transcript}"`)

            // Move to next line after recording
            setTimeout(() => {
              if (!isPlaying) { // Only move to next if not currently playing
                nextLine()
              }
            }, 1500)
          } else {
            setInterimTranscript(transcript)
          }
        },
        (error: string) => {
          setIsRecording(false)
          setInterimTranscript('')
          toast.error(`Recording Error: ${error}`)
        }
      )
    } catch (error) {
      setIsRecording(false)
      console.error('Failed to start recording:', error)
    }
  }

  // Stop recording
  const stopRecording = () => {
    speechRecognitionService.stopRecording()
    setIsRecording(false)
    setInterimTranscript('')
    setIsWaitingForResponse(false)
  }

  // Move to next line
  const nextLine = () => {
    if (isLastLine) {
      toast.success('Scene Complete! Congratulations! You completed the scene.')
      return
    }

    // Clean up current audio
    if (currentAudio) {
      currentAudio.pause()
      currentAudio.currentTime = 0
      currentAudio.onended = null
      currentAudio.onerror = null
    }

    // Stop any ongoing recording
    if (isRecording) {
      speechRecognitionService.stopRecording()
    }

    setCurrentLineIndex(prev => prev + 1)
    setUserResponse('')
    setIsWaitingForResponse(false)
    setIsPlaying(false)
    setIsRecording(false)
    setCurrentAudio(null)
    
    // Don't automatically play next line - wait for user to click play button
    console.log('Moved to next line - ready for user interaction')
  }

  // Restart scene
  const restartScene = () => {
    // Clean up current audio
    if (currentAudio) {
      currentAudio.pause()
      currentAudio.currentTime = 0
      currentAudio.onended = null
      currentAudio.onerror = null
    }

    // Stop any ongoing recording
    if (isRecording) {
      speechRecognitionService.stopRecording()
    }

    setCurrentLineIndex(0)
    setUserResponse('')
    setIsWaitingForResponse(false)
    setIsPlaying(false)
    setIsRecording(false)
    setCurrentAudio(null)
    
    // Don't automatically play audio - wait for user to click play button
    console.log('Scene restarted - ready for user interaction')
  }

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (currentAudio) {
        currentAudio.pause()
        currentAudio.currentTime = 0
        currentAudio.onended = null
        currentAudio.onerror = null
      }
      if (isRecording) {
        speechRecognitionService.stopRecording()
      }
    }
  }, [])

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-blue-600 mb-4">
          Language Practice Scene
        </h1>
        <p className="text-gray-600 mb-8">
          Enter a language to generate an interactive conversation scene
        </p>
      </div>

      {!sceneData ? (
        /* Language Input Section */
        <Card className="max-w-md mx-auto">
          <CardHeader>
            <CardTitle>Choose Your Language</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Input
              type="text"
              placeholder="e.g., Spanish, French, German"
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleGenerateScene()}
              disabled={isGenerating}
            />
            <Button 
              onClick={handleGenerateScene}
              disabled={isGenerating || !language.trim()}
              className="w-full"
            >
              {isGenerating ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Generating Scene...
                </>
              ) : (
                'Generate Scene'
              )}
            </Button>
          </CardContent>
        </Card>
      ) : (
        /* Practice Session */
        <div className="space-y-6">
          {/* Scene Header */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-2xl">{sceneData.title}</CardTitle>
                  <p className="text-muted-foreground mt-1">{sceneData.description}</p>
                </div>
                <Badge variant="secondary" className="text-lg px-3 py-1">
                  {sceneData.language}
                </Badge>
              </div>
              <div className="mt-4">
                <div className="flex items-center justify-between text-sm text-muted-foreground mb-2">
                  <span>Progress</span>
                  <span>{currentLineIndex + 1} / {sceneData.scriptLines.length}</span>
                </div>
                <Progress value={progress} className="h-2" />
              </div>
            </CardHeader>
          </Card>

          {/* Current Line Display */}
          {currentLine && (
            <Card className="border-2 border-primary/20">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-2">
                    <Volume2 className="h-5 w-5" />
                    {currentLine.speaker}
                  </CardTitle>
                  <Badge variant="outline">
                    Line {currentLine.order}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-lg">
                  "{currentLine.text} {currentLine.answer}"
                </div>

                {/* Control Buttons */}
                <div className="flex flex-wrap gap-2">
                  <Button
                    onClick={playCurrentLine}
                    disabled={isPlaying}
                    variant="outline"
                    size="sm"
                  >
                    {isPlaying ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Playing...
                      </>
                    ) : (
                      <>
                        <Play className="mr-2 h-4 w-4" />
                        Replay Audio
                      </>
                    )}
                  </Button>

                  {!isLastLine && (
                    <Button
                      onClick={nextLine}
                      variant="outline"
                      size="sm"
                    >
                      <SkipForward className="mr-2 h-4 w-4" />
                      Skip
                    </Button>
                  )}

                  <Button
                    onClick={restartScene}
                    variant="outline"
                    size="sm"
                  >
                    <RotateCcw className="mr-2 h-4 w-4" />
                    Restart
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Recording Section - Always Visible */}
          {currentLine && (
            <Card className="border-2 border-green-200 bg-green-50/30">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Mic className="h-5 w-5 text-green-600" />
                  Record Your Response
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-muted-foreground">
                  Practice saying: "{currentLine.text} {currentLine.answer}"
                </p>
                
                <div className="flex items-center gap-4">
                  <Button
                    onClick={isRecording ? stopRecording : startRecording}
                    variant={isRecording ? "destructive" : "default"}
                    size="lg"
                    className="flex-1"
                    disabled={isPlaying}
                  >
                    {isRecording ? (
                      <>
                        <MicOff className="mr-2 h-5 w-5" />
                        Stop Recording
                      </>
                    ) : (
                      <>
                        <Mic className="mr-2 h-5 w-5" />
                        Start Recording
                      </>
                    )}
                  </Button>
                </div>

                {/* Live Transcript Display */}
                {(interimTranscript || userResponse) && (
                  <div className="p-4 bg-white border border-green-200 rounded-lg">
                    <p className="text-sm text-muted-foreground mb-1">
                      {userResponse ? 'Recorded:' : 'Listening...'}
                    </p>
                    <p className="text-lg font-medium">
                      {userResponse || interimTranscript}
                    </p>
                  </div>
                )}

                {/* Recording Status */}
                {isRecording && (
                  <div className="flex items-center gap-2 text-green-600">
                    <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
                    <span className="text-sm font-medium">Recording in progress...</span>
                  </div>
                )}
              </CardContent>
            </Card>
          )}

          {/* Completion */}
          {isLastLine && !isWaitingForResponse && (
            <Card className="border-green-200 bg-green-50">
              <CardContent className="text-center py-8">
                <h2 className="text-2xl font-bold text-green-800 mb-4">
                  🎉 Scene Complete!
                </h2>
                <p className="text-green-700 mb-6">
                  Congratulations! You've completed the conversation practice.
                </p>
                <div className="flex gap-4 justify-center">
                  <Button onClick={restartScene} variant="outline">
                    <RotateCcw className="mr-2 h-4 w-4" />
                    Practice Again
                  </Button>
                  <Button onClick={() => setSceneData(null)}>
                    Generate New Scene
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      )}
    </div>
  )
}

export default Scene
