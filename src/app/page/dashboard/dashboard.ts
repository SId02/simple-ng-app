import { Component, signal } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { RouterLink } from '@angular/router';
@Component({
  imports: [DecimalPipe, RouterLink],
  selector: 'app-dashboard',
  styleUrl: './dashboard.css',
  templateUrl: './dashboard.html',
})
export class Dashboard {
  readonly totalUsers = signal(12450);
  readonly activeSessions = signal(342);
  readonly serverUptime = signal('99.98%');

  readonly recentActivities = signal([
    { id: 1, text: 'New user registered: Jane Doe', time: '5 mins ago' },
    { id: 2, text: 'Password generator utility accessed', time: '22 mins ago' },
    { id: 3, text: 'System backup completed successfully', time: '1 hour ago' },
  ]);
}
