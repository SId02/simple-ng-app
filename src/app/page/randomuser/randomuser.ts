import { Component, OnInit, signal } from '@angular/core';

interface RandomUser {
  login: {
    uuid: string;
  };
  picture: {
    large: string;
  };
  name: {
    first: string;
    last: string;
  };
  email: string;
  location: {
    country: string;
  };
}

interface RandomUserResponse {
  results: RandomUser[];
}
@Component({
  imports: [],
  selector: 'app-randomuser',
  styleUrl: './randomuser.css',
  templateUrl: './randomuser.html',
})
export class Randomuser implements OnInit {
  private readonly usersToShow = 10;

  readonly users = signal<RandomUser[]>([]);
  readonly page = signal(1);
  readonly loading = signal(false);
  readonly error = signal<string | null>(null);
  readonly initialLoad = signal(true);

  ngOnInit(): void {
    void this.fetchUsers(true);
  }

  loadMoreUsers(): void {
    if (!this.loading()) {
      void this.fetchUsers(false);
    }
  }

  private async fetchUsers(isInitialLoad: boolean): Promise<void> {
    this.loading.set(true);
    this.error.set(null);

    const requestedPage = isInitialLoad ? 1 : this.page();

    try {
      const response = await fetch(
        `https://randomuser.me/api/?page=${requestedPage}&results=${this.usersToShow}`,
      );

      if (!response.ok) {
        throw new Error(
          isInitialLoad ? 'Failed to fetch initial users' : 'Failed to fetch more users',
        );
      }

      const data = (await response.json()) as RandomUserResponse;

      if (isInitialLoad) {
        this.users.set(data.results);
        this.page.set(2);
      } else {
        this.users.update((currentUsers) => [...currentUsers, ...data.results]);
        this.page.update((currentPage) => currentPage + 1);
      }
    } catch (err: unknown) {
      this.error.set(err instanceof Error ? err.message : 'An unknown error occurred');
    } finally {
      this.loading.set(false);

      if (isInitialLoad) {
        this.initialLoad.set(false);
      }
    }
  }
}