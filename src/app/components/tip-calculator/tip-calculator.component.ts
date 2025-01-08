import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-tip-calculator',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './tip-calculator.component.html',
  styleUrl: './tip-calculator.component.css'
})
export class TipCalculatorComponent {
  billAmount: number = 0;
  tipPercentage: number = 15; 
  totalAmount: number = 0;

  calculateTip() {
    const tip = (this.billAmount * this.tipPercentage) / 100;
    this.totalAmount = this.billAmount + tip;
  }
}
