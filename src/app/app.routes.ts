import { Routes } from '@angular/router';
import { HomeComponent } from '../app/components/home/home.component';
import { AboutComponent } from '../app/components/about/about.component';
import { ContactComponent } from '../app/components/contact/contact.component';
import { PasswordgeneratorComponent } from '../app/components/passwordgenerator/passwordgenerator.component';
import { TipCalculatorComponent } from './components/tip-calculator/tip-calculator.component';
import { TestimonialComponent } from './components/testimonial/testimonial.component';
import { CounterComponent } from './components/counter/counter.component';
import { DarklightmodeComponent } from './components/darklightmode/darklightmode.component';
import { InfinitescrollComponent } from './components/infinitescroll/infinitescroll.component';
import {PokemonComponent} from './components/pokemon/pokemon.component';
export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'about', component: AboutComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'passwordgenerator', component: PasswordgeneratorComponent },
  { path: 'tip-calculator', component: TipCalculatorComponent },
  { path: 'testimonial', component: TestimonialComponent },
  { path: 'counter', component: CounterComponent },
  { path: 'darklightmode', component: DarklightmodeComponent },
  { path: 'infinitescroll', component: InfinitescrollComponent },
  {path:'pokemon',component: PokemonComponent}
];
