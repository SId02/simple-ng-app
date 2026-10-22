import { Component, signal, computed, OnInit, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RouterLink } from '@angular/router';
interface Country {
  cca3: string;
  name: { common: string };
  flags: { png: string };
  population: number;
  region: string;
  capital?: string[];
}
@Component({
  imports: [RouterLink],
  selector: 'app-typeahead',
  styleUrl: './typeahead.css',
  templateUrl: './typeahead.html',
})
export class Typeahead implements OnInit {
  private http = inject(HttpClient);

  // Signals for state management
  readonly countries = signal<Country[]>([]);
  readonly searchTerm = signal<string>('');
  readonly selectedCountry = signal<Country | null>(null);

  // Computed signal for filtering countries dynamically based on search term
  readonly filteredCountries = computed(() => {
    const term = this.searchTerm().toLowerCase().trim();
    if (!term) return [];

    return this.countries()
      .filter((country) => country.name.common.toLowerCase().includes(term))
      .slice(0, 10); // Limit results to top 10 for clean UI performance
  });

  ngOnInit(): void {
    this.fetchCountries();
  }

  private fetchCountries(): void {
    this.http.get<Country[]>('https://restcountries.com/v3.1/all').subscribe({
      next: (data) => this.countries.set(data),
      error: (err) => console.error('Error fetching countries:', err),
    });
  }

  onSearchChange(event: Event): void {
    const value = (event.target as HTMLInputElement).value;
    this.searchTerm.set(value);

    // Clear selection if user clears text input
    if (!value.trim()) {
      this.selectedCountry.set(null);
    }
  }

  selectCountry(country: Country): void {
    this.selectedCountry.set(country);
    this.searchTerm.set(country.name.common); // Set input text to selected country name
    this.countries.set([]); // Clear dropdown list on selection
  }
}