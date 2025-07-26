import React from 'react'
import { Button } from './ui/button'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'
import { Badge } from './ui/badge'
import { 
  ArrowLeft,
  CheckCircle,
  AlertCircle,
  Star,
  Trophy,
  Target,
  TrendingUp,
  MessageSquare,
  Sparkles,
  Brain,
  Award
} from 'lucide-react'
import { Link } from 'react-router-dom'

interface FeedbackData {
  overallScore: number
  pronunciation: number
  fluency: number
  accuracy: number
  completionTime: string
  strengths: string[]
  improvements: string[]
  detailedFeedback: string
  encouragement: string
  nextSteps: string[]
}

// Dummy feedback data arrays
const feedbackOptions: FeedbackData[] = [
  {
    overallScore: 85,
    pronunciation: 82,
    fluency: 88,
    accuracy: 85,
    completionTime: "4m 32s",
    strengths: [
      "Excellent pronunciation of complex words",
      "Natural conversation flow",
      "Good use of appropriate expressions"
    ],
    improvements: [
      "Work on intonation patterns",
      "Practice connecting words smoothly",
      "Focus on stress patterns in longer sentences"
    ],
    detailedFeedback: "Your conversation skills are developing well! You demonstrated strong vocabulary usage and maintained good rhythm throughout the dialogue. The pronunciation was clear and mostly accurate.",
    encouragement: "You're making fantastic progress! Keep practicing daily conversations.",
    nextSteps: [
      "Practice tongue twisters for better pronunciation",
      "Record yourself speaking and listen back",
      "Try more complex conversation scenarios"
    ]
  },
  {
    overallScore: 92,
    pronunciation: 95,
    fluency: 90,
    accuracy: 91,
    completionTime: "3m 18s",
    strengths: [
      "Outstanding pronunciation clarity",
      "Confident delivery",
      "Perfect timing and pauses",
      "Natural accent adaptation"
    ],
    improvements: [
      "Minor vocabulary expansion needed",
      "Work on expressing emotions more clearly"
    ],
    detailedFeedback: "Exceptional performance! Your pronunciation is nearly native-level, and your fluency shows remarkable improvement. The conversation felt natural and engaging.",
    encouragement: "Amazing work! You're ready for more advanced conversations.",
    nextSteps: [
      "Try advanced conversation topics",
      "Practice with native speakers",
      "Explore idiomatic expressions"
    ]
  },
  {
    overallScore: 76,
    pronunciation: 78,
    fluency: 74,
    accuracy: 76,
    completionTime: "5m 45s",
    strengths: [
      "Good effort and persistence",
      "Clear vowel sounds",
      "Appropriate response timing"
    ],
    improvements: [
      "Work on consonant clusters",
      "Practice speaking at a steadier pace",
      "Focus on sentence stress patterns",
      "Build confidence in longer responses"
    ],
    detailedFeedback: "You're building a solid foundation! While there's room for improvement, your dedication shows. The basic pronunciation elements are in place.",
    encouragement: "Keep practicing! Every conversation makes you better.",
    nextSteps: [
      "Practice basic pronunciation drills",
      "Focus on shorter conversations first",
      "Use pronunciation apps for daily practice"
    ]
  },
  {
    overallScore: 88,
    pronunciation: 86,
    fluency: 89,
    accuracy: 89,
    completionTime: "4m 02s",
    strengths: [
      "Smooth conversation transitions",
      "Good emotional expression",
      "Strong grammar usage",
      "Natural speech rhythm"
    ],
    improvements: [
      "Minor pronunciation refinements",
      "Work on reducing hesitations"
    ],
    detailedFeedback: "Very impressive performance! Your conversation skills are well-developed with natural flow and good emotional expression. The grammar usage was particularly strong.",
    encouragement: "You're becoming a confident speaker! Keep up the excellent work.",
    nextSteps: [
      "Challenge yourself with faster conversations",
      "Practice impromptu speaking",
      "Work on advanced vocabulary"
    ]
  },
  {
    overallScore: 71,
    pronunciation: 69,
    fluency: 72,
    accuracy: 73,
    completionTime: "6m 12s",
    strengths: [
      "Good vocabulary selection",
      "Decent comprehension",
      "Willing to attempt difficult words"
    ],
    improvements: [
      "Focus on clearer articulation",
      "Practice speaking more confidently",
      "Work on maintaining steady pace",
      "Improve connecting words flow"
    ],
    detailedFeedback: "You're making steady progress! The vocabulary choices were good, and your comprehension is solid. With more practice, your confidence will grow significantly.",
    encouragement: "Don't give up! You're improving with each practice session.",
    nextSteps: [
      "Practice reading aloud daily",
      "Focus on slow, clear pronunciation",
      "Record and review your progress"
    ]
  },
  {
    overallScore: 94,
    pronunciation: 96,
    fluency: 93,
    accuracy: 93,
    completionTime: "2m 58s",
    strengths: [
      "Exceptional clarity and precision",
      "Perfect intonation patterns",
      "Natural conversational speed",
      "Excellent emotional nuance",
      "Strong cultural understanding"
    ],
    improvements: [
      "Already performing at advanced level",
      "Consider exploring regional dialects"
    ],
    detailedFeedback: "Outstanding mastery! Your conversation skills are at an advanced level with exceptional clarity, perfect timing, and natural expression. This was a pleasure to analyze.",
    encouragement: "Incredible work! You've achieved conversational mastery.",
    nextSteps: [
      "Explore advanced literature discussions",
      "Practice professional presentations",
      "Consider teaching others"
    ]
  },
  {
    overallScore: 79,
    pronunciation: 81,
    fluency: 77,
    accuracy: 79,
    completionTime: "5m 15s",
    strengths: [
      "Good pronunciation foundation",
      "Appropriate response content",
      "Shows improvement over time",
      "Good listening comprehension"
    ],
    improvements: [
      "Work on speaking confidence",
      "Practice more fluid transitions",
      "Focus on reducing pauses",
      "Build speaking stamina"
    ],
    detailedFeedback: "You're developing well! The pronunciation foundation is solid, and your responses show good understanding. Building confidence will help with fluency.",
    encouragement: "You're on the right track! Consistency is key to improvement.",
    nextSteps: [
      "Practice daily conversation topics",
      "Join language exchange groups",
      "Focus on building speaking confidence"
    ]
  },
  {
    overallScore: 83,
    pronunciation: 85,
    fluency: 81,
    accuracy: 83,
    completionTime: "4m 20s",
    strengths: [
      "Clear pronunciation",
      "Good pace control",
      "Natural expressions",
      "Strong sentence structure"
    ],
    improvements: [
      "Work on linking words better",
      "Practice more complex sentences",
      "Focus on stress timing"
    ],
    detailedFeedback: "Great progress! Your pronunciation is clear and your pace is well-controlled. The sentence structures show good grammar understanding.",
    encouragement: "You're developing strong conversational skills! Keep practicing.",
    nextSteps: [
      "Practice connected speech patterns",
      "Work on advanced grammar in conversation",
      "Try role-playing different scenarios"
    ]
  },
  {
    overallScore: 90,
    pronunciation: 91,
    fluency: 89,
    accuracy: 90,
    completionTime: "3m 35s",
    strengths: [
      "Excellent overall performance",
      "Natural speech patterns",
      "Good emotional expression",
      "Strong vocabulary usage",
      "Confident delivery"
    ],
    improvements: [
      "Minor refinements in accent",
      "Practice with more challenging topics"
    ],
    detailedFeedback: "Excellent work! Your conversation skills are very strong with natural speech patterns and confident delivery. The vocabulary usage was particularly impressive.",
    encouragement: "Fantastic progress! You're speaking with real confidence now.",
    nextSteps: [
      "Challenge yourself with debate topics",
      "Practice storytelling",
      "Explore advanced conversation themes"
    ]
  }
]

interface FeedbackPageProps {
  sceneTitle: string
  language: string
  onBack: () => void
}

const FeedbackPage: React.FC<FeedbackPageProps> = ({ sceneTitle, language, onBack }) => {
  // Select random feedback data
  const randomFeedback = feedbackOptions[Math.floor(Math.random() * feedbackOptions.length)]

  const getScoreColor = (score: number) => {
    if (score >= 90) return 'text-green-600'
    if (score >= 80) return 'text-blue-600'
    if (score >= 70) return 'text-yellow-600'
    return 'text-orange-600'
  }

  const getScoreBadgeColor = (score: number) => {
    if (score >= 90) return 'bg-green-100 text-green-700'
    if (score >= 80) return 'bg-blue-100 text-blue-700'
    if (score >= 70) return 'bg-yellow-100 text-yellow-700'
    return 'bg-orange-100 text-orange-700'
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50">
      {/* Background pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(69,187,25,0.08),transparent_50%)] pointer-events-none"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(16,185,129,0.08),transparent_50%)] pointer-events-none"></div>
      
      {/* Navigation Header */}
      <div className="relative z-10 p-6">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Button
            onClick={onBack}
            className="group relative bg-white/90 backdrop-blur-sm text-[#45BB19] px-6 py-3 rounded-xl font-semibold shadow-lg hover:shadow-green-500/20 transition-all duration-300 hover:scale-105 border border-green-100/40"
          >
            <div className="absolute inset-0 bg-gradient-to-b from-white/40 via-white/20 to-transparent rounded-xl"></div>
            <div className="absolute top-0 left-0 right-0 h-1/2 bg-gradient-to-b from-white/30 to-transparent rounded-t-xl"></div>
            
            <span className="relative flex items-center">
              <ArrowLeft className="mr-2 h-5 w-5 group-hover:scale-110 transition-transform" />
              Back to Scene
            </span>
          </Button>
          
          <h1 className="text-3xl font-bold bg-gradient-to-r from-[#45BB19] via-emerald-500 to-green-600 bg-clip-text text-transparent">
            🧠 AI Feedback
          </h1>
          
          <div className="w-32"></div>
        </div>
      </div>

      <div className="relative z-10 px-4 sm:px-6 lg:px-8 pb-24">
        <div className="max-w-4xl mx-auto space-y-6">
          
          {/* Header Card */}
          <Card className="bg-white/80 backdrop-blur-sm border-green-200/50 shadow-lg">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-2xl font-bold bg-gradient-to-r from-[#45BB19] to-emerald-600 bg-clip-text text-transparent">
                    Performance Analysis
                  </CardTitle>
                  <p className="text-gray-600 mt-1">
                    Scene: "{sceneTitle}" • Language: {language}
                  </p>
                </div>
                <div className="text-center">
                  <div className={`text-4xl font-bold ${getScoreColor(randomFeedback.overallScore)}`}>
                    {randomFeedback.overallScore}%
                  </div>
                  <Badge className={getScoreBadgeColor(randomFeedback.overallScore)}>
                    Overall Score
                  </Badge>
                </div>
              </div>
            </CardHeader>
          </Card>

          {/* Performance Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card className="bg-white/90 backdrop-blur-sm shadow-lg">
              <CardContent className="p-4 text-center">
                <Target className="h-8 w-8 text-blue-500 mx-auto mb-2" />
                <div className={`text-2xl font-bold ${getScoreColor(randomFeedback.pronunciation)}`}>
                  {randomFeedback.pronunciation}%
                </div>
                <p className="text-sm font-semibold text-gray-700">Pronunciation</p>
              </CardContent>
            </Card>

            <Card className="bg-white/90 backdrop-blur-sm shadow-lg">
              <CardContent className="p-4 text-center">
                <TrendingUp className="h-8 w-8 text-green-500 mx-auto mb-2" />
                <div className={`text-2xl font-bold ${getScoreColor(randomFeedback.fluency)}`}>
                  {randomFeedback.fluency}%
                </div>
                <p className="text-sm font-semibold text-gray-700">Fluency</p>
              </CardContent>
            </Card>

            <Card className="bg-white/90 backdrop-blur-sm shadow-lg">
              <CardContent className="p-4 text-center">
                <CheckCircle className="h-8 w-8 text-purple-500 mx-auto mb-2" />
                <div className={`text-2xl font-bold ${getScoreColor(randomFeedback.accuracy)}`}>
                  {randomFeedback.accuracy}%
                </div>
                <p className="text-sm font-semibold text-gray-700">Accuracy</p>
              </CardContent>
            </Card>
          </div>

          {/* Completion Time */}
          <Card className="bg-white/90 backdrop-blur-sm shadow-lg">
            <CardContent className="p-4 flex items-center justify-center">
              <Trophy className="h-6 w-6 text-yellow-500 mr-2" />
              <span className="font-semibold text-gray-700">
                Completion Time: <span className="text-[#45BB19] font-bold">{randomFeedback.completionTime}</span>
              </span>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            
            {/* Strengths */}
            <Card className="bg-white/90 backdrop-blur-sm shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center text-green-600">
                  <Star className="mr-2 h-5 w-5" />
                  Strengths
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {randomFeedback.strengths.map((strength, index) => (
                  <div key={index} className="flex items-start space-x-2">
                    <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-gray-700">{strength}</span>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Areas for Improvement */}
            <Card className="bg-white/90 backdrop-blur-sm shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center text-orange-600">
                  <AlertCircle className="mr-2 h-5 w-5" />
                  Areas for Improvement
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {randomFeedback.improvements.map((improvement, index) => (
                  <div key={index} className="flex items-start space-x-2">
                    <Target className="h-4 w-4 text-orange-500 mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-gray-700">{improvement}</span>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Detailed Feedback */}
          <Card className="bg-white/90 backdrop-blur-sm shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center text-blue-600">
                <MessageSquare className="mr-2 h-5 w-5" />
                Detailed Analysis
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700 leading-relaxed">{randomFeedback.detailedFeedback}</p>
            </CardContent>
          </Card>

          {/* Encouragement */}
          <Card className="bg-gradient-to-r from-green-50 to-emerald-100 border-green-300 shadow-lg">
            <CardContent className="p-6 text-center">
              <Sparkles className="h-8 w-8 text-green-600 mx-auto mb-3" />
              <p className="text-lg font-semibold text-green-800">{randomFeedback.encouragement}</p>
            </CardContent>
          </Card>

          {/* Next Steps */}
          <Card className="bg-white/90 backdrop-blur-sm shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center text-purple-600">
                <Brain className="mr-2 h-5 w-5" />
                Recommended Next Steps
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {randomFeedback.nextSteps.map((step, index) => (
                <div key={index} className="flex items-start space-x-2">
                  <Award className="h-4 w-4 text-purple-500 mt-0.5 flex-shrink-0" />
                  <span className="text-sm text-gray-700">{step}</span>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Action Buttons */}
          <div className="flex space-x-4 pb-16">
            <Button
              onClick={onBack}
              className="relative bg-gradient-to-r from-[#45BB19] to-emerald-600 hover:from-emerald-600 hover:to-green-700 text-white px-8 py-3 rounded-xl font-semibold shadow-lg hover:shadow-green-500/20 transition-all duration-300 hover:scale-105 border border-green-400/40 flex-1"
            >
              <div className="absolute inset-0 bg-gradient-to-b from-white/30 via-white/10 to-transparent rounded-xl"></div>
              <span className="relative">Practice Again</span>
            </Button>
            
            <Link to="/home" className="flex-1">
              <Button className="w-full relative bg-white/90 text-gray-700 border-gray-300 hover:bg-gray-50 px-8 py-3 rounded-xl font-semibold shadow transition-all duration-300 hover:scale-105">
                <div className="absolute inset-0 bg-gradient-to-b from-white/40 via-white/20 to-transparent rounded-xl"></div>
                <span className="relative">Back to Home</span>
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default FeedbackPage
