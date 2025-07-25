// Extend the Window interface to include speech recognition
declare global {
  interface Window {
    SpeechRecognition: any
    webkitSpeechRecognition: any
  }
}

class SpeechRecognitionService {
  private recognition: any = null
  private supported: boolean

  constructor() {
    this.supported = 'webkitSpeechRecognition' in window || 'SpeechRecognition' in window
    
    if (this.supported) {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
      this.recognition = new SpeechRecognition()
      this.setupRecognition()
    }
  }

  private setupRecognition() {
    if (!this.recognition) return

    this.recognition.continuous = false
    this.recognition.interimResults = true
    this.recognition.maxAlternatives = 1
  }

  startRecording(
    language: string = 'en-US',
    onResult: (transcript: string, isFinal: boolean) => void,
    onError: (error: string) => void
  ): Promise<void> {
    return new Promise((resolve, reject) => {
      if (!this.supported || !this.recognition) {
        reject(new Error('Speech recognition not supported'))
        return
      }

      this.recognition.lang = language
      
      this.recognition.onresult = (event: any) => {
        const result = event.results[event.results.length - 1]
        const transcript = result[0].transcript
        const isFinal = result.isFinal
        
        onResult(transcript, isFinal)
        
        if (isFinal) {
          resolve()
        }
      }

      this.recognition.onerror = (event: any) => {
        const errorMessage = this.getErrorMessage(event.error)
        onError(errorMessage)
        reject(new Error(errorMessage))
      }

      this.recognition.onend = () => {
        resolve()
      }

      try {
        this.recognition.start()
      } catch (error) {
        reject(error)
      }
    })
  }

  stopRecording(): void {
    if (this.recognition) {
      this.recognition.stop()
    }
  }

  private getErrorMessage(error: string): string {
    switch (error) {
      case 'no-speech':
        return 'No speech detected'
      case 'audio-capture':
        return 'Audio capture failed'
      case 'not-allowed':
        return 'Microphone permission denied'
      case 'network':
        return 'Network error'
      default:
        return `Speech recognition error: ${error}`
    }
  }

  isSupported(): boolean {
    return this.supported
  }

  // Get supported languages
  getSupportedLanguages(): Array<{ code: string; name: string }> {
    return [
      { code: 'en-US', name: 'English (US)' },
      { code: 'en-GB', name: 'English (UK)' },
      { code: 'es-ES', name: 'Spanish (Spain)' },
      { code: 'es-MX', name: 'Spanish (Mexico)' },
      { code: 'fr-FR', name: 'French (France)' },
      { code: 'de-DE', name: 'German (Germany)' },
      { code: 'it-IT', name: 'Italian (Italy)' },
      { code: 'pt-BR', name: 'Portuguese (Brazil)' },
      { code: 'ru-RU', name: 'Russian (Russia)' },
      { code: 'ja-JP', name: 'Japanese (Japan)' },
      { code: 'ko-KR', name: 'Korean (South Korea)' },
      { code: 'zh-CN', name: 'Chinese (Mandarin)' },
    ]
  }
}

export const speechRecognitionService = new SpeechRecognitionService()
