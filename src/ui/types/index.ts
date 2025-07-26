// User types
export interface User {
  id: string
  email: string
  username?: string
  firstName?: string
  lastName?: string
  preferredLanguage?: string
  nativeLanguage?: string
  languageLevel?: string
  streakDays: number
  totalPoints: number
  createdAt: Date
  updatedAt: Date
}

// Scene types
export interface Scene {
  id: string
  title: string
  description?: string
  language: string
  difficulty: 'beginner' | 'intermediate' | 'advanced'
  category: string
  estimatedDuration: number
  scriptLines: ScriptLine[]
  createdAt: Date
  updatedAt: Date
}

export interface ScriptLine {
  id: string
  sceneId: string
  character: string
  text: string
  order: number
  voiceUrl?: string | null
  createdAt: Date
  updatedAt: Date
}

// User Response types
export interface UserResponse {
  id: string
  userId: string
  sceneId: string
  scriptLineId: string
  responseText: string
  pronunciationScore?: number
  fluencyScore?: number
  accuracyScore?: number
  completenessScore?: number
  feedback?: string
  createdAt: Date
  updatedAt: Date
}

// Tutorial types
export interface Tutorial {
  id: string
  title: string
  description?: string
  language: string
  difficulty: 'beginner' | 'intermediate' | 'advanced'
  category: string
  content: string
  estimatedDuration: number
  order: number
  isRequired: boolean
  createdAt: Date
  updatedAt: Date
}

// Progress types
export interface Progress {
  id: string
  userId: string
  sceneId?: string
  tutorialId?: string
  status: 'not_started' | 'in_progress' | 'completed'
  score?: number
  timeSpent: number
  completedAt?: Date
  createdAt: Date
  updatedAt: Date
}

// API Response types
export interface APIResponse<T> {
  success: boolean
  data?: T
  error?: string
  message?: string
}

// MURF AI types
export interface MURFOptions {
  text: string
  voice: string
  speed?: number
  pitch?: number
  volume?: number
}
