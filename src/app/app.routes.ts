import { Routes } from '@angular/router';
import { Home } from '../app/page/home/home';
import { About } from '../app/page/about/about';
import { Contact } from '../app/page/contact/contact';
import { Counter } from './page/counter/counter';
import { CrudOperation } from './page/crud-operation/crud-operation';
import { CurrencyConverter } from './page/currency-converter/currency-converter';
import { Dashboard } from './page/dashboard/dashboard';
import { Dragdrop } from './page/dragdrop/dragdrop';
import { GithubUserProfileFinder } from './page/github-user-profile-finder/github-user-profile-finder';
import { Inifintescroll } from './page/inifintescroll/inifintescroll';
import { Passwordgenerator } from '../app/page/passwordgenerator/passwordgenerator';
import { Productlistsearchsortfilter } from './page/productlistsearchsortfilter/productlistsearchsortfilter';
import { TipCalculator } from './page/tip-calculator/tip-calculator';
import { Testimonials } from './page/testimonials/testimonial';
import { Utilities } from './page/utilities/utilities';

export const routes: Routes = [
  { path: '', component: Home },
  { path: 'about', component: About },
  { path: 'contact', component: Contact },
  { path: 'counter', component: Counter },
  { path: 'crud-operation', component: CrudOperation },
  {path:'currencyconverter',component:CurrencyConverter},
  {path: 'dashboard', component: Dashboard},
  { path: 'dragdrop', component: Dragdrop },
  { path: 'githubuserprofilefinder', component: GithubUserProfileFinder },
  { path: 'infinitescroll', component: Inifintescroll },
  { path: 'passwordgenerator', component: Passwordgenerator },
  { path: 'productlistsearchsortfilter', component: Productlistsearchsortfilter },
  { path: 'tip-calculator', component: TipCalculator },
  { path: 'testimonials', component: Testimonials },
  { path: 'utilities', component: Utilities },
  { path: '**', redirectTo: '' },
];
