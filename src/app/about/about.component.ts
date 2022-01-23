import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  title = 'appComponent';
  isShowDiv = false;
  toggleDisplayDiv() {
 this.isShowDiv = !this.isShowDiv;
 }
  clickCounter: number = 0;
  clickCounter2: number = 0;
  countClick() {
    this.clickCounter += 1;
    }
    
    countClick2() {
      this.clickCounter2 -= 1;
      }

}
