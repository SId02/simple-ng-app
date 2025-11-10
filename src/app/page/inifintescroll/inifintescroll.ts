import { Component, OnInit, HostListener } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-inifintescroll',
  imports: [CommonModule],
  templateUrl: './inifintescroll.html',
  styleUrl: './inifintescroll.css'
})
export class Inifintescroll implements OnInit {
 posts: any[] = [];
  page = 1;
  limit = 20;
  viewType = 'grid'; // 'grid' or 'list'
  loading = false;

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.loadPosts();
  }

  loadPosts() {
    if (this.loading) return;
    this.loading = true;
    this.http.get<any[]>(`https://jsonplaceholder.typicode.com/posts?_page=${this.page}&_limit=${this.limit}`)
      .subscribe(data => {
        this.posts = [...this.posts, ...data];
        this.loading = false;
        this.page++;
      });
  }

  // Infinite scroll logic
  @HostListener('window:scroll', [])
  onScroll() {
    if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight - 1) {
      this.loadPosts();
    }
  }

  switchView(type: string) {
    this.viewType = type;
  }
}
