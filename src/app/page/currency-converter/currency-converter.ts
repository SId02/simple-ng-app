import { Component, inject, signal, computed, effect } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  imports: [CommonModule, FormsModule],
  selector: 'app-currency-converter',
  styleUrl: './currency-converter.css',
  templateUrl: './currency-converter.html',
})
export class CurrencyConverter {
  private http = inject(HttpClient);

  exchangeRates = signal<Record<string, number>>({});
  amount = signal<number | ''>(1);
  fromCurrency = signal<string>('USD');
  toCurrency = signal<string>('INR');


  currencies = computed(() => Object.keys(this.exchangeRates()));


  convertedAmount = computed(() => {
    const rates = this.exchangeRates();
    const targetRate = rates[this.toCurrency()];
    const currentAmount = Number(this.amount()) || 0;

    if (targetRate) {
      return (currentAmount * targetRate).toFixed(2);
    }
    return '0.00';
  });

  constructor() {
  
    effect(() => {
      const currency = this.fromCurrency();
      const apiUrl = `https://api.exchangerate-api.com/v4/latest/${currency}`;

      this.http.get<{ rates: Record<string, number> }>(apiUrl).subscribe({
        next: (response) => {
          this.exchangeRates.set(response.rates);
        },
        error: (error) => {
          console.error('Error fetching currency exchange rate:', error);
        },
      });
    });
  }


  updateAmount(event: Event) {
    const value = (event.target as HTMLInputElement).value;
    this.amount.set(value === '' ? '' : Number(value));
  }

  updateFromCurrency(event: Event) {
    const value = (event.target as HTMLSelectElement).value;
    this.fromCurrency.set(value);
  }

  updateToCurrency(event: Event) {
    const value = (event.target as HTMLSelectElement).value;
    this.toCurrency.set(value);
  }
}
