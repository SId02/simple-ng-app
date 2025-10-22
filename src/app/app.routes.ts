import { Routes } from '@angular/router';
import { Home } from '../app/page/home/home';
import { About } from '../app/page/about/about';
import { Contact } from '../app/page/contact/contact';
import { Passwordgenerator } from '../app/page/passwordgenerator/passwordgenerator';
 import { TipCalculator } from './page/tip-calculator/tip-calculator';
import { TestimonialC } from './page/testimonial/testimonial';
import { Counter } from './page/counter/counter';
import { Darklightmode } from './page/darklightmode/darklightmode';
import { Inifintescroll } from './page/inifintescroll/inifintescroll';
import {Pokemon} from './page/pokemon/pokemon';
import { UserList } from './page/user-list/user-list';
import { UserForm } from './page/user-form/user-form';

export const routes: Routes = [
  { path: '', component: Home },
  { path: 'about', component: About },
  { path: 'contact', component: Contact },
  { path: 'passwordgenerator', component: Passwordgenerator },
  { path: 'tip-calculator', component: TipCalculator },
  { path: 'testimonial', component: TestimonialC},
  { path: 'counter', component: Counter},
  { path: 'darklightmode', component: Darklightmode },
  { path: 'infinitescroll', component: Inifintescroll },
  { path: 'pokemon', component: Pokemon },
  { path: 'userlist', component: UserList },
  { path: 'add', component: UserForm },
  { path: 'edit/:id', component: UserForm },
  { path: '**', redirectTo: '' },
];
