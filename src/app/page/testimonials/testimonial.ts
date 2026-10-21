import { Component, signal, computed } from '@angular/core';
interface Testimonial {
  image: string;
  name: string;
  message: string;
}
@Component({
  imports: [],
  selector: 'app-testimonial',
  styleUrl: './testimonial.css',
  templateUrl: './testimonial.html',
})
export class Testimonials {
  readonly currentIndex = signal(0);

  readonly testimonials: Testimonial[] = [
    {
      image: 'https://via.placeholder.com/150?text=User+1',
      name: 'User 1',
      message: 'This is a fantastic product! Highly recommend it.',
    },
    {
      image: 'https://via.placeholder.com/150?text=User+2',
      name: 'User 2',
      message: 'Amazing experience, will definitely use it again!',
    },
    {
      image: 'https://via.placeholder.com/150?text=User+3',
      name: 'User 3',
      message: 'A game changer in my daily routine!',
    },
    {
      image: 'https://via.placeholder.com/150?text=User+4',
      name: 'User 4',
      message: 'Exceptional quality and great customer support!',
    },
  ];

  readonly activeTestimonial = computed(() => this.testimonials[this.currentIndex()]);
  nextTestimonial() {
    this.currentIndex.update((idx) => (idx + 1) % this.testimonials.length);
  }
  prevTestimonial() {
    this.currentIndex.update(
      (idx) => (idx - 1 + this.testimonials.length) % this.testimonials.length,
    );
  }
}
