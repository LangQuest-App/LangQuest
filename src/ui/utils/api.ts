import type { Scene } from '../types/index'

const API_BASE = 'https://langquest-backend.onrender.com'

export interface SceneRequest {
  language: string
}

export interface SceneResponse {
  scene: Scene
}

class APIService {
  async generateScene(language: string): Promise<Scene> {
    try {
      const response = await fetch(`${API_BASE}/scene`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ language }),
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const data: SceneResponse = await response.json()
      return data.scene
    } catch (error) {
      console.error('API Error:', error)
      throw new Error('Failed to generate scene')
    }
  }

  // Mock method for development - returns sample scene
  async generateMockScene(language: string): Promise<Scene> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000))

    const mockScene: Scene = {
      id: Date.now().toString(),
      title: `${language} Conversation Practice`,
      description: `Practice your ${language} conversation skills`,
      language,
      difficulty: 'intermediate',
      category: 'conversation',
      estimatedDuration: 300,
      scriptLines: [
        {
          id: '1',
          sceneId: Date.now().toString(),
          character: 'Waiter',
          text: 'Good evening! Welcome to our restaurant. How many people are in your party?',
          order: 1,
          voiceUrl: null,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: '2',
          sceneId: Date.now().toString(),
          character: 'You',
          text: 'Table for two, please.',
          order: 2,
          voiceUrl: null,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: '3',
          sceneId: Date.now().toString(),
          character: 'Waiter',
          text: 'Perfect! Right this way. Here are your menus. Can I start you off with something to drink?',
          order: 3,
          voiceUrl: null,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: '4',
          sceneId: Date.now().toString(),
          character: 'You',
          text: 'Two glasses of water, please.',
          order: 4,
          voiceUrl: null,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: '5',
          sceneId: Date.now().toString(),
          character: 'Waiter',
          text: 'Coming right up! Take your time looking at the menu.',
          order: 5,
          voiceUrl: null,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      createdAt: new Date(),
      updatedAt: new Date(),
    }

    return mockScene
  }
}

export const apiService = new APIService()
