import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from '../interfaces';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private usersSubject: BehaviorSubject<User[]>;
  private selectedUserSubject: BehaviorSubject<number>;

  constructor(private http: HttpClient) {
    this.usersSubject = new BehaviorSubject<User[]>([]);

    this.selectedUserSubject = new BehaviorSubject<number>(this.userID);
    this.fetchUsers();
  }

  getUsers(): Observable<User[]> {
    return this.usersSubject.asObservable();
  }

  getSelectedUser(): Observable<number> { 
    return this.selectedUserSubject.asObservable();
  }

  userID = 1;
  
  setSelectedUser(userId: number) {
    this.selectedUserSubject.next(userId);
    this.userID = userId
  }

  private async fetchUsers() {
    try {
      this.http.get<User[]>('https://jsonplaceholder.typicode.com/users').subscribe({next: (response)=>{
        this.usersSubject.next(response);
      }});
    } catch (error) {
      console.error('Failed to fetch users', error);
    }
  }

  getUserById(userId: number): Observable<User> {
    return this.http.get<User>(`https://jsonplaceholder.typicode.com/users/${userId}`);
  }
}
