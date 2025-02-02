declare global {
    interface Window {
      SpeechRecognition: SpeechRecognitionConstructor;
      webkitSpeechRecognition: SpeechRecognitionConstructor;
    }
  }
  
  interface SpeechRecognitionConstructor {
    new (): SpeechRecognition;
  }
  
  interface SpeechRecognition extends EventTarget {
    lang: string;
    interimResults: boolean;
    maxAlternatives: number;
    start(): void;
    stop(): void;
    onresult: ((this: SpeechRecognition, event: SpeechRecognitionEvent) => void) | null;
    onerror: ((this: SpeechRecognition, event: SpeechRecognitionErrorEvent) => void) | null;
    onend: ((this: SpeechRecognition, event: Event) => void) | null;
  }
  
  interface SpeechRecognitionEvent extends Event {
    readonly results: SpeechRecognitionResultList;
  }
  
  interface SpeechRecognitionResultList {
    readonly length: number;
    item(index: number): SpeechRecognitionResult;
    [index: number]: SpeechRecognitionResult;
  }
  
  interface SpeechRecognitionResult {
    readonly length: number;
    item(index: number): SpeechRecognitionAlternative;
    [index: number]: SpeechRecognitionAlternative;
    readonly isFinal: boolean;
  }
  
  interface SpeechRecognitionAlternative {
    readonly transcript: string;
    readonly confidence: number;
  }
  
  interface SpeechRecognitionErrorEvent extends Event {
    readonly error: string;
    readonly message: string;
  }
  
  export function startSpeechToText(): Promise<string> {
    return new Promise((resolve, reject) => {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      if (!SpeechRecognition) {
        reject(new Error('Speech Recognition API is not supported in this browser.'));
        return;
      }
  
      const recognition = new SpeechRecognition();
      recognition.lang = 'en-US';                // Set the language
      recognition.interimResults = false;        // Only return final results.
      recognition.maxAlternatives = 1;           // Use only the top alternative.
  
      recognition.onresult = (event: SpeechRecognitionEvent) => {
        if (event.results.length > 0 && event.results[0].length > 0) {
          const transcript = event.results[0][0].transcript;
          resolve(transcript);
        } else {
          reject(new Error('No speech was recognized.'));
        }
      };
  
      recognition.onerror = (event: SpeechRecognitionErrorEvent) => {
        reject(new Error(event.error));
      };
  
      recognition.onend = () => {
        console.log('Speech recognition ended.');
      };
  
      recognition.start();
    });
  }
  
  export {}; 
  