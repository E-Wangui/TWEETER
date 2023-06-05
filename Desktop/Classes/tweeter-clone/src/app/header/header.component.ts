// header.component.ts
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { User } from '../interfaces';
import { PostService } from '../services/post.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule],
  providers: [PostService],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  user!: User;

  constructor(private userService: UserService) {}

  userID = this.userService.userID

  ngOnInit() {
    this.userService.setSelectedUser(this.userID)
    this.userService.getSelectedUser().subscribe(userId => {
      if (userId) {
        this.userService.getUserById(userId).subscribe(user => {
          this.user = user;
        });
      }
    });
  }
}
