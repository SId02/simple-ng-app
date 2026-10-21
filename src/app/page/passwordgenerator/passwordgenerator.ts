import { Component, signal } from '@angular/core';
@Component({
  imports: [],
  selector: 'app-passwordgenerator',
  styleUrl: './passwordgenerator.css',
  templateUrl: './passwordgenerator.html',
})
export class Passwordgenerator {

  readonly length = signal<number>(10);
  readonly includeUppercase = signal<boolean>(false);
  readonly includeLowercase = signal<boolean>(true);
  readonly includeNumbers = signal<boolean>(true);
  readonly includeSymbols = signal<boolean>(false);
  readonly generatedPassword = signal<string>('');

  private readonly lowerChars = 'abcdefghijklmnopqrstuvwxyz';
  private readonly upperChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  private readonly numberChars = '0123456789';
  private readonly symbolChars = '!@#$%^&*()<>{}';

  updateLength(event: Event): void {
    const value = +(event.target as HTMLInputElement).value;
    this.length.set(value);
  }

  toggleOption(
    option: 'includeUppercase' | 'includeLowercase' | 'includeNumbers' | 'includeSymbols',
    event: Event,
  ): void {
    const checked = (event.target as HTMLInputElement).checked;
    switch (option) {
      case 'includeUppercase':
        this.includeUppercase.set(checked);
        break;
      case 'includeLowercase':
        this.includeLowercase.set(checked);
        break;
      case 'includeNumbers':
        this.includeNumbers.set(checked);
        break;
      case 'includeSymbols':
        this.includeSymbols.set(checked);
        break;
    }
  }

  generatePassword(): void {
    let characterSet = '';

    if (this.includeLowercase()) characterSet += this.lowerChars;
    if (this.includeUppercase()) characterSet += this.upperChars;
    if (this.includeNumbers()) characterSet += this.numberChars;
    if (this.includeSymbols()) characterSet += this.symbolChars;

    if (!characterSet) {
      this.generatedPassword.set('Please select at least one character type.');
      return;
    }

    const password = Array.from({ length: this.length() })
      .map(() => characterSet.charAt(Math.floor(Math.random() * characterSet.length)))
      .join('');

    this.generatedPassword.set(password);
  }
}
