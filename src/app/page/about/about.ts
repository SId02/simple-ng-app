import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  imports: [CommonModule],
  selector: 'app-about',
  styleUrl: './about.css',
  templateUrl: './about.html',
})
export class About {
  appName = signal('Simple-ng-app');
  appDescription = signal(
    'simple-ng-app is an app made using Angular 22 and Bootstrap 5.3.8 for style. It is a collection of concepts in Angular like Navigation, HttpClient for API calls, Form validation, standalone components, signals, and others.',
  );
}
