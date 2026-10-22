import { Component, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
@Component({
  imports: [RouterLink],
  selector: 'app-tip-calculator',
  styleUrl: './tip-calculator.css',
  templateUrl: './tip-calculator.html',
})
export class TipCalculator {
  readonly billAmount = signal<number>(0);
  readonly tipPercentage = signal<number>(15);
  readonly tipAmount = signal<number>(0);
  readonly totalAmount = signal<number>(0);
  readonly hasCalculated = signal<boolean>(false);

  updateBillAmount(event: Event): void {
    const value = +(event.target as HTMLInputElement).value;
    this.billAmount.set(isNaN(value) ? 0 : value);
  }

  updateTipPercentage(event: Event): void {
    const value = +(event.target as HTMLInputElement).value;
    this.tipPercentage.set(isNaN(value) ? 0 : value);
  }

  calculateTip(): void {
    const bill = this.billAmount();
    const percent = this.tipPercentage();

    const tip = (bill * percent) / 100;
    const total = bill + tip;

    this.tipAmount.set(tip);
    this.totalAmount.set(total);
    this.hasCalculated.set(true);
  }
}
