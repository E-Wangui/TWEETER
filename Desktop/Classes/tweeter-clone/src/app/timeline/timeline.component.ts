import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { PostService } from '../services/post.service';
import { CommonModule } from '@angular/common';
import { Post, User, Comment } from '../interfaces';
import { combineLatest } from 'rxjs';
import { CommentsService } from '../services/comments.service';

@Component({
  selector: 'app-timeline',
  standalone: true,
  imports: [CommonModule],
  providers: [UserService, PostService, CommentsService],
  templateUrl: './timeline.component.html',
  styleUrls: ['./timeline.component.css'],
})
export class TimelineComponent implements OnInit {
  user!: User;
  posts!: Post[];
  commentsMap: { [postId: number]: Comment[] } = {};


  constructor(
    private userService: UserService,
    private postService: PostService,
    private commentsService: CommentsService
  ) {}

  ngOnInit() {
    this.getData();
  }

  getData(){
    console.log(this.userService.userID);
    
    combineLatest([
      this.userService.getSelectedUser(),
      this.userService.getUsers()
    ]).subscribe(([selectedUser, users]) => {
      // console.log(selectedUser);
      
      this.user = users.find((user) => user.id === selectedUser) as User;
      this.postService.getPosts(selectedUser).subscribe({next: (posts) => {
        this.posts = posts;
        
        this.posts.forEach((post) => {
          post.expand=false
          this.commentsService.getCommentsForPost(post.id).subscribe({next: (comments) => {
            this.commentsMap[post.id] = comments;
          }});
        });
      }});
    });
  }
  
  showComments(id:number){
   let post = this.posts.find(p=>p.id === id)
   if(post){
    post.expand = !post.expand
   }
  }
}
