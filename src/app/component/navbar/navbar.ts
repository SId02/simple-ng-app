import { Component ,inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ThemeService } from '../../service/theme/theme';
@Component({
  imports: [RouterLink],
  selector: 'app-navbar',
  styleUrl: './navbar.css',
  templateUrl: './navbar.html',
})
export class Navbar {
  readonly themeService = inject(ThemeService);
}
