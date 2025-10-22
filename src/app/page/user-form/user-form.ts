
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { User } from '../../services/user';
@Component({
  selector: 'app-user-form',
  imports: [CommonModule, FormsModule],
  templateUrl: './user-form.html',
  styleUrl: './user-form.css'
})
export class UserForm  implements OnInit {
@Input() user: any = {};
  @Output() formSubmit = new EventEmitter<any>();
  @Output() formCancel = new EventEmitter<void>();

  constructor(private userService: User) { }

  ngOnInit(): void {

    this.user = { ...this.user };
  }

  onSubmit(form: NgForm): void {
    if (form.valid) {
      if (this.user.id) {
   
        this.userService.updateUser(this.user.id, this.user).subscribe(() => {
          this.formSubmit.emit(this.user);
        });
      } else {

        this.userService.addUser(this.user).subscribe(() => {
          this.formSubmit.emit(this.user);
        });
      }
    }
  }

  onCancel(): void {
    this.formCancel.emit();
  }
}
