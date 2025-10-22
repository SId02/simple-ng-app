import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-tip-calculator',
  imports: [FormsModule],
  templateUrl: './tip-calculator.html',
  styleUrl: './tip-calculator.css'
})
export class TipCalculator {
 billAmount: number = 0;
  tipPercentage: number = 15; 
  totalAmount: number = 0;

  calculateTip() {
    const tip = (this.billAmount * this.tipPercentage) / 100;
    this.totalAmount = this.billAmount + tip;
  }
}
