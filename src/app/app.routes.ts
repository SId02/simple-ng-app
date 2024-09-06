import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from '../app/components/about/about.component';
import { ContactComponent } from '../app/components/contact/contact.component';
import { PasswordgeneratorComponent } from '../app/components/passwordgenerator/passwordgenerator.component';
export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'about', component: AboutComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'passwordgenerator', component: PasswordgeneratorComponent },
];




