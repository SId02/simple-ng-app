import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-counter',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './counter.component.html',
  styleUrl: './counter.component.css'
})
export class CounterComponent {
  count: number = 0;

  increment() {
    this.count++;
  }

  decrement() {
    this.count--;
  }

  reset() {
    this.count = 0;
  }

  // New method to determine color based on count
  getCountColor(): string {
    if (this.count > 0) return 'text-success';
    if (this.count < 0) return 'text-danger';
    return 'text-secondary';
  }
}
