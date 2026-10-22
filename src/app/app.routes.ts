import { Routes } from '@angular/router';
import { Home } from '../app/page/home/home';
import { About } from '../app/page/about/about';
import { Contact } from '../app/page/contact/contact';
import { Counter } from './page/counter/counter';
import { Dragdrop } from './page/dragdrop/dragdrop';
import { GithubUserProfileFinder } from './page/github-user-profile-finder/github-user-profile-finder';
import { Inifintescroll } from './page/inifintescroll/inifintescroll';
import { Passwordgenerator } from '../app/page/passwordgenerator/passwordgenerator';
import { Productlistsearchsortfilter } from './page/productlistsearchsortfilter/productlistsearchsortfilter';
import { TipCalculator } from './page/tip-calculator/tip-calculator';
import { Typeahead } from './page/typeahead/typeahead';
import { Testimonials } from './page/testimonials/testimonial';


export const routes: Routes = [
  { path: '', component: Home },
  { path: 'about', component: About },
  { path: 'contact', component: Contact },
  { path: 'counter', component: Counter },
  { path: 'dragdrop', component: Dragdrop },
  { path: 'githubuserprofilefinder', component: GithubUserProfileFinder },
  { path: 'infinitescroll', component: Inifintescroll },
  { path: 'passwordgenerator', component: Passwordgenerator },
  { path: 'productlistsearchsortfilter', component: Productlistsearchsortfilter },
  { path: 'tip-calculator', component: TipCalculator },
  { path: 'testimonials', component: Testimonials },
  { path: 'typeahead', component: Typeahead },
  { path: '**', redirectTo: '' },
];
