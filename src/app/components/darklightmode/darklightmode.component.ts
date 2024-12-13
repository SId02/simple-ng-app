import { Component } from '@angular/core';

@Component({
  selector: 'app-darklightmode',
  standalone: true,
  imports: [],
  templateUrl: './darklightmode.component.html',
  styleUrl: './darklightmode.component.css'
})
export class DarklightmodeComponent {
  isDarkMode: boolean = false;

  handleToggle(): void {
    this.isDarkMode = !this.isDarkMode;
  }
}
