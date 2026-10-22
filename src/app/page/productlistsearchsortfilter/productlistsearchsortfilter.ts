import { Component, signal, computed, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  imports: [FormsModule, RouterLink],
  selector: 'app-productlistsearchsortfilter',
  styleUrl: './productlistsearchsortfilter.css',
  templateUrl: './productlistsearchsortfilter.html',
})
export class Productlistsearchsortfilter implements OnInit {
  // Signals state management
  products = signal<any[]>([]);
  searchTerm = signal<string>('');
  sortOption = signal<string>('id');
  filterCategory = signal<string>('');
  loading = signal<boolean>(false);
  error = signal<string | null>(null);

  categories = computed(() => [...new Set(this.products().map((p) => p.category))]);

  filteredProducts = computed(() => {
    let filtered = this.products();
    const search = this.searchTerm().toLowerCase();
    const category = this.filterCategory();

    if (search) {
      filtered = filtered.filter(
        (product) =>
          product.title.toLowerCase().includes(search) ||
          product.description.toLowerCase().includes(search),
      );
    }

    if (category) {
      filtered = filtered.filter((product) => product.category === category);
    }

    return filtered;
  });

  sortedProducts = computed(() => {
    const sorted = [...this.filteredProducts()];
    const option = this.sortOption();

    sorted.sort((a, b) => {
      if (option === 'price') {
        return a.price - b.price;
      } else if (option === 'rating') {
        return b.rating - a.rating;
      }
      return a.id - b.id;
    });

    return sorted;
  });

  ngOnInit() {
    this.fetchProducts();
  }

  private async fetchProducts() {
    this.loading.set(true);
    this.error.set(null);
    try {
      const response = await fetch('https://dummyjson.com/products');
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();
      this.products.set(data.products);
    } catch (e: any) {
      this.error.set(e.message);
    } finally {
      this.loading.set(false);
    }
  }
}
