import { Component, signal, computed, effect, OnDestroy } from '@angular/core';
import { RouterLink } from '@angular/router';
@Component({
  imports: [RouterLink],
  selector: 'app-utilities',
  styleUrl: './utilities.css',
  templateUrl: './utilities.html',
})
export class Utilities implements OnDestroy {

  readonly activeTab = signal<'clock' | 'stopwatch' | 'wordcounter'>('clock');

  // --- Digital Clock State ---
  readonly timeString = signal<string>('');
  readonly dateString = signal<string>('');
  readonly dayString = signal<string>('');

  // --- Stopwatch State ---
  readonly isRunning = signal<boolean>(false);
  readonly seconds = signal<number>(0);
  readonly minutes = signal<number>(0);
  readonly hours = signal<number>(0);
  readonly laps = signal<string[]>([]);

  readonly formattedStopwatch = computed(() => {
    const h = String(this.hours()).padStart(2, '0');
    const m = String(this.minutes()).padStart(2, '0');
    const s = String(this.seconds()).padStart(2, '0');
    return `${h}:${m}:${s}`;
  });

  // --- Word Counter State ---
  readonly text = signal<string>('');

  readonly wordStats = computed(() => {
    const trimmed = this.text().trim();
    const characters = trimmed.length;

    const wordsArr = trimmed ? trimmed.split(/\s+/) : [];
    const validWords = wordsArr.filter((word) => {
      return word.split('').some((char) => {
        const code = char.charCodeAt(0);
        return (
          (code > 47 && code < 58) || // Numbers
          (code > 64 && code < 91) || // Uppercase
          (code > 96 && code < 123) // Lowercase
        );
      });
    });

    const wordCount = validWords.length;
    const readingTime = (wordCount / 100).toFixed(2);

    return { characters, words: wordCount, readingTime };
  });

  private clockInterval: any;
  private stopwatchInterval: any;

  constructor() {
    this.startClock();
    this.startStopwatchEffect();
  }

  setActiveTab(tab: 'clock' | 'stopwatch' | 'wordcounter'): void {
    this.activeTab.set(tab);
  }

  private startClock(): void {
    const update = () => {
      const now = new Date();
      this.timeString.set(now.toLocaleTimeString());
      this.dayString.set(now.toLocaleDateString(undefined, { weekday: 'long' }));
      this.dateString.set(
        now.toLocaleDateString(undefined, {
          weekday: 'long',
          year: 'numeric',
          month: 'long',
          day: 'numeric',
        }),
      );
    };
    update();
    this.clockInterval = setInterval(update, 1000);
  }

  private startStopwatchEffect(): void {
    effect(() => {
      if (this.isRunning()) {
        this.stopwatchInterval = setInterval(() => {
          this.seconds.update((s) => {
            if (s === 59) {
              this.minutes.update((m) => {
                if (m === 59) {
                  this.hours.update((h) => h + 1);
                  return 0;
                }
                return m + 1;
              });
              return 0;
            }
            return s + 1;
          });
        }, 1000);
      } else {
        clearInterval(this.stopwatchInterval);
      }
    });
  }

  toggleStopwatch(): void {
    this.isRunning.update((val) => !val);
  }

  resetStopwatch(): void {
    this.isRunning.set(false);
    this.seconds.set(0);
    this.minutes.set(0);
    this.hours.set(0);
    this.laps.set([]);
  }

  addLap(): void {
    if (this.isRunning()) {
      this.laps.update((l) => [...l, this.formattedStopwatch()]);
    }
  }

  updateText(event: Event): void {
    const val = (event.target as HTMLTextAreaElement).value;
    this.text.set(val);
  }

  resetWordCounter(): void {
    this.text.set('');
  }

  ngOnDestroy(): void {
    clearInterval(this.clockInterval);
    clearInterval(this.stopwatchInterval);
  }
}
