class SpeechRecognitionService {
  private recognition: any = null
  public supported: boolean = false

  constructor() {
    // Check for browser support
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition
    
    if (SpeechRecognition) {
      this.recognition = new SpeechRecognition()
      this.supported = true
      
      // Configure recognition
      this.recognition.continuous = true
      this.recognition.interimResults = true
      this.recognition.maxAlternatives = 1
    } else {
      console.warn('Speech recognition not supported in this browser')
      this.supported = false
    }
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
        return 'No speech was detected. Please try again.'
      case 'audio-capture':
        return 'Audio capture failed. Please check your microphone.'
      case 'not-allowed':
        return 'Microphone access denied. Please allow microphone access.'
      case 'network':
        return 'Network error occurred. Please check your connection.'
      case 'aborted':
        return 'Speech recognition was aborted.'
      default:
        return `Speech recognition error: ${error}`
    }
  }

  isSupported(): boolean {
    return this.supported
  }
}

// Create and export a singleton instance
export const speechRecognitionService = new SpeechRecognitionService()
export default speechRecognitionService
