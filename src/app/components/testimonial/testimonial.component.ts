import { Component } from '@angular/core';
interface Testimonial {
  image: string;
  name: string;
  message: string;
}
@Component({
  selector: 'app-testimonial',
  standalone: true,
  imports: [],
  templateUrl: './testimonial.component.html',
  styleUrl: './testimonial.component.css'
})
export class TestimonialComponent {
  currentTestimonial: number = 0;

  testimonials: Testimonial[] = [
    {
      image: 'https://via.placeholder.com/150?text=User+1',
      name: 'User 1',
      message: 'This is a fantastic product! Highly recommend it.'
    },
    {
      image: 'https://via.placeholder.com/150?text=User+2',
      name: 'User 2',
      message: 'Amazing experience, will definitely use it again!'
    },
    {
      image: 'https://via.placeholder.com/150?text=User+3',
      name: 'User 3',
      message: 'A game changer in my daily routine!'
    }
  ];

  nextTestimonial() {
    this.currentTestimonial = (this.currentTestimonial + 1) % this.testimonials.length;
  }

  prevTestimonial() {
    this.currentTestimonial = (this.currentTestimonial - 1 + this.testimonials.length) % this.testimonials.length;
  }
}
