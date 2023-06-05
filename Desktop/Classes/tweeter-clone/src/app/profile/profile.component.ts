import { Component, OnInit, Output } from '@angular/core';
import { UserService } from '../services/user.service';
import { CommonModule } from '@angular/common';
import { User } from '../interfaces';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule],
  providers: [UserService],
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  user!: User;
  constructor(private userService: UserService) {}

  userId = Number(localStorage.getItem('userId'));

  ngOnInit() {
    console.log(this.userId);
    this.userService.getUserById(this.userId).subscribe(user => {
      this.user = user
      console.log(user);
      
    });
    
    // this.userService.getSelectedUser().subscribe((userId) => {
    //   // console.log(userId);
      
    //   if (userId) {
    //     this.userService.getUserById(userId).subscribe({next:user => {
    //       this.user = user;
    //     }});
    //   }
    // }
    // );
  }
}
