/**
 * Distinction ZA Text-To-Speech Service
 * Provides audio narration for Foundation Phase (Grades 1-3) learners and accessibility
 */

export class SpeechService {
  private static synth: SpeechSynthesis | null = typeof window !== 'undefined' ? window.speechSynthesis : null;
  private static isSpeaking = false;

  static speak(text: string, onEnd?: () => void): void {
    if (!this.synth) {
      if (onEnd) onEnd();
      return;
    }

    try {
      this.synth.cancel(); // Stop any active speech

      const cleanText = text.replace(/[#*_`$]/g, ' ').trim();
      const utterance = new SpeechSynthesisUtterance(cleanText);
      utterance.rate = 0.9; // Slightly slower, clear pacing for South African learners
      utterance.pitch = 1.05; // Friendly tone

      // Try to find an English (South Africa) voice if available
      const voices = this.synth.getVoices();
      const saVoice = voices.find((v) => v.lang.includes('en-ZA') || v.lang.includes('en_ZA'));
      if (saVoice) {
        utterance.voice = saVoice;
      }

      utterance.onend = () => {
        this.isSpeaking = false;
        if (onEnd) onEnd();
      };

      utterance.onerror = () => {
        this.isSpeaking = false;
        if (onEnd) onEnd();
      };

      this.isSpeaking = true;
      this.synth.speak(utterance);
    } catch (e) {
      console.warn('Speech synthesis error', e);
      this.isSpeaking = false;
      if (onEnd) onEnd();
    }
  }

  static stop(): void {
    if (this.synth) {
      this.synth.cancel();
      this.isSpeaking = false;
    }
  }

  static getIsSpeaking(): boolean {
    return this.isSpeaking;
  }
}
