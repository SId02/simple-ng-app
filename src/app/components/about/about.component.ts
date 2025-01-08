import { Component } from '@angular/core';
//import { CounterComponent } from '../counter/counter.component';
import { UsersdetailsComponent } from '../usersdetails/usersdetails.component';
@Component({
  selector: 'app-about',
  standalone: true,
  imports: [UsersdetailsComponent],
 // imports: [CounterComponent],
  templateUrl: './about.component.html',
  styleUrl: './about.component.css',
})
export class AboutComponent {}
