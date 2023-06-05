import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserService } from '../services/user.service';
import { User } from '../interfaces';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, FormsModule],
  providers: [UserService],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  users!: User[];
  selectedUser!: number;

  constructor(private userService: UserService) {}

  ngOnInit() {
    this.userService.getUsers().subscribe({next: users => {
      this.users = users;
    }});
  }

  onUserChange() {
    this.userService.setSelectedUser(this.selectedUser);
    localStorage.setItem('userId', this.selectedUser.toString())
  }
}