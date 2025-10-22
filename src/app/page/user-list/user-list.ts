import { Component , OnInit} from '@angular/core';
import { User } from '../../services/user';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; 
import { RouterLink } from '@angular/router';
@Component({
  selector: 'app-user-list',
  imports: [CommonModule,FormsModule,RouterLink],
  templateUrl: './user-list.html',
  styleUrl: './user-list.css'
})
export class UserList  implements OnInit {
users: any[] = [];
  paginatedUsers: any[] = [];
  currentPage = 1;
  itemsPerPage = 5;

  constructor(private user: User) { }

  ngOnInit(): void {
    this.fetchUsers();
  }

  fetchUsers(): void {
    this.user.getUsers().subscribe(data => {
      this.users = data;
      this.paginateUsers();
    });
  }

  paginateUsers(): void {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    this.paginatedUsers = this.users.slice(startIndex, endIndex);
  }
  goToPage(page: number): void {
    this.currentPage = page;
    this.paginateUsers();
  }
  deleteUser(id: number): void {
    if (confirm('Are you sure you want to delete this user?')) {
      this.user.deleteUser(id).subscribe(() => {

        this.users = this.users.filter(user => user.id !== id);
        this.paginateUsers();
        alert('User deleted successfully!');
      });
    }
  }

getTotalPages(): number {
  return Math.ceil(this.users.length / this.itemsPerPage);
}

getPages(): number[] {
  return Array(this.getTotalPages()).fill(0).map((x, i) => i + 1);
}

}
