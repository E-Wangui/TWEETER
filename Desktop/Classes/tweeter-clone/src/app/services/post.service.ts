// post.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { Post } from '../interfaces';

@Injectable({
  providedIn: 'root'
})
export class PostService {
  private postsSubject: BehaviorSubject<Post[]>;

  constructor(private http: HttpClient) {
    this.postsSubject = new BehaviorSubject<Post[]>([]);
  }

  getPosts(userId: number): Observable<Post[]> {
    this.fetchPosts(userId);
    return this.postsSubject.asObservable();
  }

  private async fetchPosts(userId: number) {
    try {
      const response = await this.http.get<Post[]>(`https://jsonplaceholder.typicode.com/posts?userId=${userId}`).toPromise();
      this.postsSubject.next(response as Post[]);
    } catch (error) {
      console.error('Failed to fetch posts', error);
    }
  }
}
