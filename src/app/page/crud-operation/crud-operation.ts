import { CommonModule } from '@angular/common';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
interface Post {
  userId: number;
  id: number;
  title: string;
  body: string;
}
type PostInput = Pick<Post, 'title' | 'body'>;

@Component({
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  selector: 'app-crud-operation',
  styleUrl: './crud-operation.css',
  templateUrl: './crud-operation.html',
})
export class CrudOperation implements OnInit {
  private readonly http = inject(HttpClient);
  private readonly fb = inject(FormBuilder);
  private readonly api = 'https://jsonplaceholder.typicode.com/posts';
  private readonly pageSize = 10;

  readonly posts = signal<Post[]>([]);
  readonly page = signal(1);
  readonly loading = signal(true);
  readonly saving = signal(false);
  readonly deletingId = signal<number | null>(null);
  readonly error = signal('');
  readonly formOpen = signal(false);
  readonly editingId = signal<number | null>(null);

  readonly totalPages = computed(() => Math.max(1, Math.ceil(this.posts().length / this.pageSize)));

  readonly pagePosts = computed(() => {
    const start = (this.page() - 1) * this.pageSize;
    return this.posts().slice(start, start + this.pageSize);
  });

  readonly postForm = this.fb.nonNullable.group({
    title: ['', [Validators.required, Validators.minLength(3)]],
    body: ['', [Validators.required, Validators.minLength(5)]],
  });

  ngOnInit(): void {
    this.http.get<Post[]>(this.api).subscribe({
      next: (posts) => {
        this.posts.set(posts);
        this.loading.set(false);
      },
      error: (err: HttpErrorResponse) => this.handleError(err),
    });
  }

  changePage(nextPage: number): void {
    if (nextPage >= 1 && nextPage <= this.totalPages()) {
      this.page.set(nextPage);
    }
  }

  openAdd(): void {
    this.error.set('');
    this.editingId.set(null);
    this.postForm.reset({ title: '', body: '' });
    this.formOpen.set(true);
  }

  openEdit(post: Post): void {
    this.error.set('');
    this.editingId.set(post.id);
    this.postForm.reset({ title: post.title, body: post.body });
    this.formOpen.set(true);
  }

  closeForm(): void {
    this.formOpen.set(false);
    this.editingId.set(null);
    this.postForm.reset();
  }

  showError(controlName: 'title' | 'body'): boolean {
    const control = this.postForm.controls[controlName];
    return control.invalid && (control.touched || control.dirty);
  }

  savePost(): void {
    if (this.postForm.invalid) {
      this.postForm.markAllAsTouched();
      return;
    }

    const input: PostInput = this.postForm.getRawValue();
    const id = this.editingId();
    this.saving.set(true);
    this.error.set('');

    if (id === null) {
      this.http.post<Post>(this.api, { ...input, userId: 1 }).subscribe({
        next: (created) => {
          // The API returns a created record; insert locally for this session.
          const newPost: Post = {
            userId: 1,
            id: created.id ?? Date.now(),
            ...input,
          };
          this.posts.update((posts) => [newPost, ...posts]);
          this.page.set(1);
          this.saving.set(false);
          this.closeForm();
        },
        error: (err: HttpErrorResponse) => this.finishWithError(err),
      });
      return;
    }

    this.http.put<Post>(`${this.api}/${id}`, { ...input, userId: 1, id }).subscribe({
      next: () => {
        this.posts.update((posts) =>
          posts.map((post) => (post.id === id ? { ...post, ...input } : post)),
        );
        this.saving.set(false);
        this.closeForm();
      },
      error: (err: HttpErrorResponse) => this.finishWithError(err),
    });
  }

  deletePost(post: Post): void {
    if (!confirm(`Delete "${post.title}"?`)) return;

    this.deletingId.set(post.id);
    this.error.set('');

    this.http.delete(`${this.api}/${post.id}`).subscribe({
      next: () => {
        this.posts.update((posts) => posts.filter((item) => item.id !== post.id));
        if (this.page() > this.totalPages()) {
          this.page.set(this.totalPages());
        }
        this.deletingId.set(null);
      },
      error: (err: HttpErrorResponse) => {
        this.deletingId.set(null);
        this.handleError(err);
      },
    });
  }

  private finishWithError(err: HttpErrorResponse): void {
    this.saving.set(false);
    this.handleError(err);
  }

  private handleError(err: HttpErrorResponse): void {
    console.error(err);
    this.error.set('Request failed. Please try again.');
    this.loading.set(false);
  }
}

