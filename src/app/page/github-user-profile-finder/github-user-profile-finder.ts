import { Component, signal, inject } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { RouterLink } from '@angular/router';
 @Component({
   imports: [FormsModule, DatePipe, RouterLink],
   selector: 'app-github-user-profile-finder',
   styleUrl: './github-user-profile-finder.css',
   templateUrl: './github-user-profile-finder.html',
 })
 export class GithubUserProfileFinder {
   private httpClient = inject(HttpClient);

   // Angular Signals for reactive state management
   username = signal<string>('');
   user = signal<any | null>(null);
   repos = signal<any[]>([]);
   error = signal<string | null>(null);
   isLoading = signal<boolean>(false);

   // Two-way bound input model
   inputUsername = '';

   onSubmit(event: Event): void {
     event.preventDefault();
     const trimmed = this.inputUsername.trim();
     if (!trimmed) return;

     this.username.set(trimmed);
     this.fetchUserProfile(trimmed);
   }

   private fetchUserProfile(username: string): void {
     this.isLoading.set(true);
     this.error.set(null);
     this.user.set(null);
     this.repos.set([]);

     // Fetch user details
     this.httpClient.get<any>(`https://api.github.com/users/${username}`).subscribe({
       next: (userData) => {
         this.user.set(userData);
         this.isLoading.set(false);
       },
       error: (err: HttpErrorResponse) => {
         this.error.set(err.error?.message || 'User not found or network error occurred.');
         this.isLoading.set(false);
       },
     });

     // Fetch top public repositories
     this.httpClient
       .get<any[]>(`https://api.github.com/users/${username}/repos?per_page=5`)
       .subscribe({
         next: (repoData) => {
           this.repos.set(repoData);
         },
         error: () => {
           // Non-blocking repo fetch error fallback
         },
       });
   }
 }
