import { Component, computed, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
@Component({
  imports: [RouterLink],
  selector: 'app-counter',
  styleUrl: './counter.css',
  templateUrl: './counter.html',
})
export class Counter {
  readonly count = signal(0);

  readonly countColor = computed(() => {
    const value = this.count();

    if (value > 0) return 'text-success';
    if (value < 0) return 'text-danger';
    return 'text-secondary';
  });

  increment(): void {
    this.count.update((value) => value + 1);
  }

  decrement(): void {
    this.count.update((value) => value - 1);
  }

  reset(): void {
    this.count.set(0);
  }
}
