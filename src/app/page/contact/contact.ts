import { Component, signal } from '@angular/core';

interface ContactForm {
  name: string;
  email: string;
  subject: string;
  message: string;
}

@Component({
  imports: [],
  selector: 'app-contact',
  styleUrl: './contact.css',
  templateUrl: './contact.html',
})
export class Contact {
  readonly formData = signal<ContactForm>({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  readonly submitted = signal(false);
  readonly attemptedSubmit = signal(false);

  updateField(field: keyof ContactForm, value: string): void {
    this.formData.update((current) => ({
      ...current,
      [field]: value,
    }));
  }

  isEmailValid(): boolean {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(this.formData().email);
  }

  submit(): void {
    this.attemptedSubmit.set(true);

    const { name, email, subject, message } = this.formData();

    if (!name.trim() || !this.isEmailValid() || !subject.trim() || !message.trim()) {
      this.submitted.set(false);
      return;
    }

    this.submitted.set(true);
  }
}
