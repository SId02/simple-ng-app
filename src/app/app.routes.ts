import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { ContactComponent } from './contact/contact.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'about', component: AboutComponent },
  { path: 'contact', component: ContactComponent },
];


// 15.26

ng generate component components/about
ng generate component components/contact

ng generate component components/darklightmode --skip-tests

ng generate component components/infinitescroll --skip-tests
ng generate component components/testimonial --skip-tests
ng generate component components/carousel --skip-tests

ng generate component components/counter --skip-tests

ng generate component components/tip-calculator --skip-tests

ng generate component components/passwordgenerator --skip-tests

ng generate component components/passwordgenerator --skip-tests

