import { Component, OnDestroy, OnInit, signal, computed, effect } from '@angular/core';
import { RouterLink } from '@angular/router';

type UtilityTab = 'clock' | 'stopwatch' | 'wordcounter' | 'leapyear' | 'converter' | 'traffic' | 'ticker' | 'rating';
type SignalColor = 'red' | 'yellow' | 'green';

interface Stock {
  symbol: string;
  price: number;
}

interface Rating {
  value: number;
  label: string;
}
@Component({
  imports: [RouterLink],
  selector: 'app-utilities',
  styleUrl: './utilities.css',
  templateUrl: './utilities.html',
})
export class Utilities implements OnInit, OnDestroy {
  // --- Active Tab Navigation State ---
  readonly activeTab = signal<UtilityTab>('clock');

  // --- 1. Digital Clock State ---
  readonly timeString = signal<string>('');
  readonly dateString = signal<string>('');
  readonly dayString = signal<string>('');

  // --- 2. Stopwatch State ---
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

  // --- 3. Word Counter State ---
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
          (code > 96 && code < 123)   // Lowercase
        );
      });
    });

    const wordCount = validWords.length;
    const readingTime = (wordCount / 100).toFixed(2);

    return { characters, words: wordCount, readingTime };
  });

  // --- 4. Leap Year Checker State ---
  readonly year = signal('');
  readonly leapMessage = signal('');

  // --- 5. Number Converter State ---
  readonly inputNumber = signal('');
  readonly decimalNumber = signal('');
  readonly binaryNumber = signal('');
  readonly hexadecimalNumber = signal('');
  readonly octalNumber = signal('');
  readonly numberError = signal('');

  // --- 6. Traffic Signal State ---
  readonly color = signal<SignalColor>('red');
  readonly trafficTime = signal(10);

  // --- 7. Stock Ticker State ---
  readonly stocks = signal<Stock[]>([
    { symbol: 'AAPL', price: 170.50 },
    { symbol: 'GOOGL', price: 2700.25 },
    { symbol: 'MSFT', price: 285.75 },
    { symbol: 'AMZN', price: 3200.10 },
    { symbol: 'TSLA', price: 850.30 },
    { symbol: 'FB', price: 210.80 },
    { symbol: 'NVDA', price: 250.60 },
    { symbol: 'BABA', price: 120.40 },
    { symbol: 'JPM', price: 155.90 },
    { symbol: 'V', price: 230.15 },
  ]);

  // --- 8. Review Rating State ---
  readonly rating = signal(0);
  readonly hoverRating = signal(0);

  readonly ratings: Rating[] = [
    { value: 1, label: 'Poor' },
    { value: 2, label: 'Average' },
    { value: 3, label: 'Good' },
    { value: 4, label: 'Very Good' },
    { value: 5, label: 'Excellent' },
  ];

  // Intervals and Timers
  private clockInterval: any;
  private stopwatchInterval: any;
  private trafficTimerId: ReturnType<typeof setInterval> | undefined;

  constructor() {
    this.startClock();
    this.startStopwatchEffect();
  }

  ngOnInit(): void {
    this.trafficTimerId = setInterval(() => this.tickTrafficSignal(), 1000);
  }

  ngOnDestroy(): void {
    clearInterval(this.clockInterval);
    clearInterval(this.stopwatchInterval);
    if (this.trafficTimerId !== undefined) {
      clearInterval(this.trafficTimerId);
    }
  }

  setActiveTab(tab: UtilityTab): void {
    this.activeTab.set(tab);
  }

  // Clock methods
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
        })
      );
    };
    update();
    this.clockInterval = setInterval(update, 1000);
  }

  // Stopwatch methods
  private startStopwatchEffect(): void {
    effect((onCleanup) => {
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

        onCleanup(() => clearInterval(this.stopwatchInterval));
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

  // Word counter methods
  updateText(event: Event): void {
    const val = (event.target as HTMLTextAreaElement).value;
    this.text.set(val);
  }

  resetWordCounter(): void {
    this.text.set('');
  }

  // Leap year methods
  checkLeapYear(): void {
    const enteredYear = Number(this.year());

    if (!this.year().trim() || !Number.isInteger(enteredYear)) {
      this.leapMessage.set('Please enter a valid year.');
      return;
    }

    const isLeapYear =
      enteredYear % 4 === 0 &&
      (enteredYear % 100 !== 0 || enteredYear % 400 === 0);

    this.leapMessage.set(
      `The year ${enteredYear} is ${isLeapYear ? '' : 'not '}a leap year.`
    );
  }

  // Number converter methods
  convertNumber(value: string): void {
    this.inputNumber.set(value);
    this.numberError.set('');

    const input = value.trim();

    if (!input) {
      this.clearNumberResults();
      return;
    }

    let base: number;

    if (/^[01]+$/.test(input)) {
      base = 2;
    } else if (/^[0-9A-Fa-f]+$/.test(input) && /[A-Fa-f]/.test(input)) {
      base = 16;
    } else if (/^[0-7]+$/.test(input)) {
      base = 8;
    } else if (/^[0-9]+$/.test(input)) {
      base = 10;
    } else {
      this.numberError.set(
        'Please enter a valid number (binary: 0/1; hex: 0-9, A-F; octal: 0-7; decimal: 0-9).'
      );
      this.clearNumberResults();
      return;
    }

    const decimalValue = Number.parseInt(input, base);

    if (!Number.isFinite(decimalValue)) {
      this.numberError.set('Conversion error.');
      this.clearNumberResults();
      return;
    }

    this.decimalNumber.set(decimalValue.toString());
    this.binaryNumber.set(decimalValue.toString(2));
    this.hexadecimalNumber.set(decimalValue.toString(16).toUpperCase());
    this.octalNumber.set(decimalValue.toString(8));
  }

  private clearNumberResults(): void {
    this.decimalNumber.set('');
    this.binaryNumber.set('');
    this.hexadecimalNumber.set('');
    this.octalNumber.set('');
  }

  // Traffic signal methods
  private tickTrafficSignal(): void {
    if (this.trafficTime() > 1) {
      this.trafficTime.update((value) => value - 1);
      return;
    }

    switch (this.color()) {
      case 'red':
        this.color.set('green');
        this.trafficTime.set(15);
        break;
      case 'green':
        this.color.set('yellow');
        this.trafficTime.set(5);
        break;
      case 'yellow':
        this.color.set('red');
        this.trafficTime.set(40);
        break;
    }
  }

  // Stock ticker methods
  formatPrice(price: number): string {
    return `$${price.toFixed(2)}`;
  }

  // Star rating methods
  isStarFilled(starValue: number): boolean {
    return starValue <= Math.max(this.hoverRating(), this.rating());
  }

  getStarColor(starValue: number): string {
    if (!this.isStarFilled(starValue)) {
      return '#ccc';
    }
    return starValue === 1 ? '#ef5350' : '#ffee58';
  }

  ratingLabel(): string {
    return this.ratings.find((item) => item.value === this.rating())?.label ?? '';
  }
}
