import { Component, OnInit } from '@angular/core';
import UsersJson from '../users.json';

interface USERS {
  id: Number;
  name: String;
  username: String;
  email: String;
}
@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {


  Users: USERS[] = UsersJson;
  constructor(){
    console.log(this.Users);
  }

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
