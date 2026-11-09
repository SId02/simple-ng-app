// import { Component, signal } from '@angular/core';
// import { RouterLink } from '@angular/router';

// @Component({
//   selector: 'app-home',
//   standalone: true,
//   imports: [RouterLink],
//   templateUrl: './home.html',
//   styleUrl: './home.css',
// })
// export class Home {
//   readonly appTitle = signal('Simple-NG-APP');
//   readonly angularVersion = signal('Angular 22');
//   readonly bootstrapVersion = signal('Bootstrap 5.3.8');
// }

import { Component, signal } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {
  readonly appTitle = signal('Simple-NG-APP');
  readonly angularVersion = signal('Angular 22');
  readonly bootstrapVersion = signal('Bootstrap 5.3.8');
}

