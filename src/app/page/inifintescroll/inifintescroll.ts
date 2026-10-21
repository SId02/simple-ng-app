import { Component, OnInit, HostListener, signal, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  imports: [],
  selector: 'app-inifintescroll',
  styleUrl: './inifintescroll.css',
  templateUrl: './inifintescroll.html',
})
export class Inifintescroll implements OnInit {
  private http = inject(HttpClient);

  readonly posts = signal<any[]>([]);
  readonly page = signal(1);
  readonly viewType = signal<'grid' | 'list'>('grid');
  readonly loading = signal(false);

  private readonly limit = 20;

  ngOnInit() {
    this.loadPosts();
  }

  loadPosts() {
    if (this.loading()) return;

    this.loading.set(true);

    this.http
      .get<any[]>(
        `https://jsonplaceholder.typicode.com/posts?_page=${this.page()}&_limit=${this.limit}`,
      )
      .subscribe({
        next: (data) => {

          this.posts.update((currentPosts) => [...currentPosts, ...data]);
          this.page.update((p) => p + 1);
          this.loading.set(false);
        },
        error: () => this.loading.set(false),
      });
  }

  @HostListener('window:scroll', [])
  onScroll() {
    
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 1) {
      this.loadPosts();
    }
  }

  switchView(type: 'grid' | 'list') {
    this.viewType.set(type);
  }
}
