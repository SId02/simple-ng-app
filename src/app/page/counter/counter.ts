import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-counter',
  imports: [CommonModule],
  templateUrl: './counter.html',
  styleUrl: './counter.css'
})
export class Counter {
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

  getCountColor(): string {
    if (this.count > 0) return 'text-success';
    if (this.count < 0) return 'text-danger';
    return 'text-secondary';
  }
}
