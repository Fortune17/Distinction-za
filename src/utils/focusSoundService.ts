/**
 * Web Audio API based sound synthesizer for Focus Sessions and Study Rooms.
 * 100% client-side, zero network assets, zero external mp3 downloads,
 * works completely offline and in Low-Data mode.
 */

class FocusSoundService {
  private audioCtx: AudioContext | null = null;
  private ambientOsc: OscillatorNode | null = null;
  private ambientGain: GainNode | null = null;
  private ambientFilter: BiquadFilterNode | null = null;
  private isAmbientPlaying: boolean = false;

  private initCtx(): AudioContext | null {
    if (typeof window === 'undefined') return null;
    try {
      if (!this.audioCtx) {
        const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
        this.audioCtx = new AudioContextClass();
      }
      if (this.audioCtx.state === 'suspended') {
        this.audioCtx.resume();
      }
      return this.audioCtx;
    } catch (e) {
      console.warn('AudioContext not supported or blocked', e);
      return null;
    }
  }

  /**
   * Play a pleasant bell / chime when a focus session starts
   */
  playSessionStart(): void {
    const ctx = this.initCtx();
    if (!ctx) return;

    try {
      const now = ctx.currentTime;
      // Dual harmonic tones: E5 (659Hz) and B5 (987Hz)
      const freqs = [659.25, 987.77];
      freqs.forEach((freq, i) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, now + i * 0.12);

        gain.gain.setValueAtTime(0, now);
        gain.gain.linearRampToValueAtTime(0.18, now + i * 0.12 + 0.04);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + i * 0.12 + 1.2);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start(now + i * 0.12);
        osc.stop(now + i * 0.12 + 1.3);
      });
    } catch (e) {
      console.warn('Error playing session start chime', e);
    }
  }

  /**
   * Play a celebratory chime when a study session completes (Break time or Goal achieved)
   */
  playSessionComplete(): void {
    const ctx = this.initCtx();
    if (!ctx) return;

    try {
      const now = ctx.currentTime;
      // Arpeggio: C5 (523Hz), E5 (659Hz), G5 (784Hz), C6 (1046Hz)
      const notes = [523.25, 659.25, 783.99, 1046.5];
      notes.forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        const noteStart = now + idx * 0.15;

        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, noteStart);

        gain.gain.setValueAtTime(0, noteStart);
        gain.gain.linearRampToValueAtTime(0.22, noteStart + 0.03);
        gain.gain.exponentialRampToValueAtTime(0.0001, noteStart + 1.4);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start(noteStart);
        osc.stop(noteStart + 1.5);
      });
    } catch (e) {
      console.warn('Error playing session complete chime', e);
    }
  }

  /**
   * Play a quick friendly "Cheer / Reaction" pop
   */
  playCheerReaction(): void {
    const ctx = this.initCtx();
    if (!ctx) return;

    try {
      const now = ctx.currentTime;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(440, now);
      osc.frequency.exponentialRampToValueAtTime(880, now + 0.12);

      gain.gain.setValueAtTime(0.15, now);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.25);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now);
      osc.stop(now + 0.25);
    } catch (e) {}
  }

  /**
   * Start ambient study sound (Calm Lo-Fi alpha focus drone)
   */
  startAmbientFocus(volume: number = 0.25): void {
    if (this.isAmbientPlaying) return;
    const ctx = this.initCtx();
    if (!ctx) return;

    try {
      const now = ctx.currentTime;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      const filter = ctx.createBiquadFilter();

      // Warm 108Hz low drone with soft warmth
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(108, now);

      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(260, now);
      filter.Q.setValueAtTime(2.5, now);

      gain.gain.setValueAtTime(0.0001, now);
      gain.gain.linearRampToValueAtTime(Math.min(volume * 0.12, 0.1), now + 1.5);

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now);

      this.ambientOsc = osc;
      this.ambientGain = gain;
      this.ambientFilter = filter;
      this.isAmbientPlaying = true;
    } catch (e) {
      console.warn('Error starting focus ambience', e);
    }
  }

  /**
   * Stop ambient focus sound
   */
  stopAmbientFocus(): void {
    if (!this.isAmbientPlaying || !this.audioCtx) return;
    try {
      if (this.ambientGain) {
        const now = this.audioCtx.currentTime;
        this.ambientGain.gain.linearRampToValueAtTime(0.0001, now + 0.5);
      }
      setTimeout(() => {
        if (this.ambientOsc) {
          try {
            this.ambientOsc.stop();
            this.ambientOsc.disconnect();
          } catch (e) {}
          this.ambientOsc = null;
        }
        this.isAmbientPlaying = false;
      }, 550);
    } catch (e) {
      this.isAmbientPlaying = false;
    }
  }

  setAmbientVolume(vol: number): void {
    if (this.ambientGain && this.audioCtx) {
      const clamped = Math.max(0, Math.min(1, vol));
      this.ambientGain.gain.setValueAtTime(clamped * 0.1, this.audioCtx.currentTime);
    }
  }

  getIsAmbientPlaying(): boolean {
    return this.isAmbientPlaying;
  }
}

export const focusSounds = new FocusSoundService();
