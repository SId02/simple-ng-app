import { CurrencyPipe } from '@angular/common';
import { Component, computed, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';

type Category = 'Food' | 'Transport' | 'Bills' | 'Shopping' | 'Other';

interface Expense {
  id: number;
  title: string;
  amount: number;
  category: Category;
  date: string;
}

@Component({
  imports: [FormsModule, CurrencyPipe],
  selector: 'app-expense-tracker',
  styleUrl: './expense-tracker.css',
  templateUrl: './expense-tracker.html',
})
export class ExpenseTracker {
  readonly categories: Category[] = ['Food', 'Transport', 'Bills', 'Shopping', 'Other'];

  private readonly storageKey = 'expense-tracker-items';

  readonly expenses = signal<Expense[]>(this.loadExpenses());
  readonly filter = signal<Category | 'All'>('All');

  title = '';
  amount: number | null = null;
  category: Category = 'Food';
  date = new Date().toISOString().slice(0, 10);

  readonly total = computed(() =>
    this.expenses().reduce((sum, expense) => sum + expense.amount, 0),
  );

  readonly filteredExpenses = computed(() => {
    const selected = this.filter();
    return this.expenses()
      .filter((expense) => selected === 'All' || expense.category === selected)
      .sort((a, b) => b.date.localeCompare(a.date));
  });

  addExpense(): void {
    const title = this.title.trim();
    const amount = Number(this.amount);

    if (!title || !Number.isFinite(amount) || amount <= 0 || !this.date) {
      return;
    }

    this.save([
      ...this.expenses(),
      {
        id: Date.now(),
        title,
        amount,
        category: this.category,
        date: this.date,
      },
    ]);

    this.title = '';
    this.amount = null;
    this.category = 'Food';
    this.date = new Date().toISOString().slice(0, 10);
  }

  deleteExpense(id: number): void {
    this.save(this.expenses().filter((expense) => expense.id !== id));
  }

  private save(expenses: Expense[]): void {
    this.expenses.set(expenses);
    localStorage.setItem(this.storageKey, JSON.stringify(expenses));
  }

  private loadExpenses(): Expense[] {
    try {
      const stored = localStorage.getItem(this.storageKey);
      return stored ? (JSON.parse(stored) as Expense[]) : [];
    } catch {
      return [];
    }
  }
}
