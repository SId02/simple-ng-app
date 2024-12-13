import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-passwordgenerator',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './passwordgenerator.component.html',
  styleUrl: './passwordgenerator.component.css'
})
export class PasswordgeneratorComponent {
  length: number = 8; // Default length
  includeUppercase: boolean = false;
  includeLowercase: boolean = true;
  includeNumbers: boolean = true;
  includeSymbols: boolean = false;
  generatedPassword: string = '';

  private lowerChars: string = 'abcdefghijklmnopqrstuvwxyz';
  private upperChars: string = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  private numberChars: string = '0123456789';
  private symbolChars: string = '!@#$%^&*:=';

  onLengthChange(event: Event) {
    const target = event.target as HTMLInputElement; // Cast the target to HTMLInputElement
    this.length = +target.value; // Update length with the numeric value
  }

  generatePassword() {
    let characterSet = '';

    if (this.includeLowercase) {
      characterSet += this.lowerChars;
    }
    if (this.includeUppercase) {
      characterSet += this.upperChars;
    }
    if (this.includeNumbers) {
      characterSet += this.numberChars;
    }
    if (this.includeSymbols) {
      characterSet += this.symbolChars;
    }

    if (characterSet.length === 0) {
      this.generatedPassword = 'Please select at least one character type.';
      return;
    }

    this.generatedPassword = Array.from({ length: this.length })
      .map(() => characterSet.charAt(Math.floor(Math.random() * characterSet.length)))
      .join('');
  }
}
