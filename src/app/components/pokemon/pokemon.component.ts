import { Component, OnInit, OnDestroy } from '@angular/core';





@Component({
  selector: 'app-pokemon',
  standalone: true,
  imports: [
    CommonModule,  
    HttpClientModule],
  templateUrl: './pokemon.component.html',
  styleUrl: './pokemon.component.css'
})
export class PokemonComponent implements OnInit, OnDestroy {
 
}
