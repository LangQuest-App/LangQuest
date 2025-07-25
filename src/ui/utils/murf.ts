import type { MURFOptions } from '../types/index'

class MURFService {
  private apiKey: string = ''
  private baseUrl: string = 'https://api.murf.ai/v1'

  constructor(apiKey?: string) {
    // In Electron/browser environment, we'll use a different approach for env vars
    // For now, we'll just use the provided apiKey or empty string
    this.apiKey = apiKey || ''
  }

  async generateSpeech(options: MURFOptions): Promise<string> {
    try {
      // For development, return a mock audio URL
      if (!this.apiKey) {
        console.warn('MURF API key not configured, using mock audio')
        return this.getMockAudioUrl(options.text)
      }

      const response = await fetch(`${this.baseUrl}/speech/generate`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this.apiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          text: options.text,
          voice: options.voice,
          speed: options.speed || 1.0,
          pitch: options.pitch || 1.0,
          volume: options.volume || 1.0,
        }),
      })

      if (!response.ok) {
        throw new Error(`MURF API error: ${response.status}`)
      }

      const data = await response.json()
      return data.audioUrl
    } catch (error) {
      console.error('MURF Error:', error)
      // Fallback to mock audio
      return this.getMockAudioUrl(options.text)
    }
  }

  private getMockAudioUrl(text: string): string {
    // For development, we can use browser's speech synthesis
    // or return a placeholder audio URL
    return `data:audio/wav;base64,${btoa(text)}`
  }

  async playAudio(audioUrl: string): Promise<void> {
    return new Promise((resolve, reject) => {
      // If it's a mock URL, use speech synthesis
      if (audioUrl.startsWith('data:audio/wav;base64,')) {
        const text = atob(audioUrl.split(',')[1])
        this.speakText(text)
          .then(resolve)
          .catch(reject)
        return
      }

      // Otherwise, play the actual audio URL
      const audio = new Audio(audioUrl)
      
      audio.onended = () => resolve()
      audio.onerror = () => reject(new Error('Failed to play audio'))
      
      audio.play().catch(reject)
    })
  }

  private speakText(text: string): Promise<void> {
    return new Promise((resolve, reject) => {
      if (!('speechSynthesis' in window)) {
        reject(new Error('Speech synthesis not supported'))
        return
      }

      const utterance = new SpeechSynthesisUtterance(text)
      utterance.onend = () => resolve()
      utterance.onerror = () => reject(new Error('Speech synthesis failed'))
      
      speechSynthesis.speak(utterance)
    })
  }

  getAvailableVoices(): Array<{ id: string; name: string; language: string }> {
    // Return available MURF voices (mock data)
    return [
      { id: 'en-US-sarah', name: 'Sarah (US English)', language: 'en-US' },
      { id: 'en-US-mike', name: 'Mike (US English)', language: 'en-US' },
      { id: 'en-GB-emily', name: 'Emily (British English)', language: 'en-GB' },
      { id: 'es-ES-maria', name: 'Maria (Spanish)', language: 'es-ES' },
      { id: 'fr-FR-pierre', name: 'Pierre (French)', language: 'fr-FR' },
      { id: 'de-DE-anna', name: 'Anna (German)', language: 'de-DE' },
    ]
  }
}

export const murfService = new MURFService()
