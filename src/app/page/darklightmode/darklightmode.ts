import { Component } from '@angular/core';

@Component({
  selector: 'app-darklightmode',
  imports: [],
  templateUrl: './darklightmode.html',
  styleUrl: './darklightmode.css'
})
export class Darklightmode {
isDarkMode: boolean = false;

  handleToggle(): void {
    this.isDarkMode = !this.isDarkMode;
  }
}
