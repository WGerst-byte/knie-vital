/**
 * KnieVital - Audio Synthesizer (Web Audio API)
 * Generiert harmonische Signaltöne für Countdown, Phasenwechsel und Trainingsabschluss
 */

class PhysioAudio {
    constructor() {
        this.ctx = null;
        this.isMuted = false;
    }

    init() {
        if (!this.ctx) {
            const AudioContextClass = window.AudioContext || window.webkitAudioContext;
            if (AudioContextClass) {
                this.ctx = new AudioContextClass();
            }
        }
        if (this.ctx && this.ctx.state === 'suspended') {
            this.ctx.resume();
        }
    }

    toggleMute() {
        this.isMuted = !this.isMuted;
        return this.isMuted;
    }

    playTone(frequency, duration, type = 'sine', gainVal = 0.15) {
        if (this.isMuted) return;
        try {
            this.init();
            if (!this.ctx) return;

            const osc = this.ctx.createOscillator();
            const gain = this.ctx.createGain();

            osc.type = type;
            osc.frequency.setValueAtTime(frequency, this.ctx.currentTime);

            // Sanftes Ein- und Ausblenden (Attack & Decay)
            gain.gain.setValueAtTime(0.001, this.ctx.currentTime);
            gain.gain.exponentialRampToValueAtTime(gainVal, this.ctx.currentTime + 0.03);
            gain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + duration);

            osc.connect(gain);
            gain.connect(this.ctx.destination);

            osc.start();
            osc.stop(this.ctx.currentTime + duration);
        } catch (e) {
            console.warn('Audio playback error:', e);
        }
    }

    playTick() {
        // Kurzer Holz-Klick / Countdown-Tick
        this.playTone(660, 0.08, 'sine', 0.08);
    }

    playStart() {
        // Angenehmer Start-Akkord
        this.playTone(523.25, 0.25, 'triangle', 0.12); // C5
        setTimeout(() => this.playTone(659.25, 0.35, 'triangle', 0.12), 100); // E5
        setTimeout(() => this.playTone(783.99, 0.45, 'triangle', 0.14), 200); // G5
    }

    playPause() {
        // Tieferer, entspannender Ton für Pause
        this.playTone(440, 0.2, 'sine', 0.1);
        setTimeout(() => this.playTone(349.23, 0.35, 'sine', 0.1), 120);
    }

    playComplete() {
        // Harmonische Erfolgsfanfare
        const notes = [523.25, 659.25, 783.99, 1046.50]; // C - E - G - C
        notes.forEach((freq, idx) => {
            setTimeout(() => {
                this.playTone(freq, 0.45, 'sine', 0.15);
            }, idx * 130);
        });
    }
}

const physioAudio = new PhysioAudio();
