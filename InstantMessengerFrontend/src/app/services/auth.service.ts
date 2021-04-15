import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../models/user';
import { BaseService } from './base.service';
import { map } from 'rxjs/operators';
import { ReplaySubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService extends BaseService<User>{
loggedIn: boolean;
private currentUserSource = new ReplaySubject<User>(1);
currentUser$ = this.currentUserSource.asObservable()

 constructor(http: HttpClient) {
      super(http);
      this.controllerPath = "users"
  }

  login(user: User) {
    return this.postModel(user).pipe(
      map((respose: User) => {
        const user = respose;
        if (user) {
          localStorage.setItem('user', JSON.stringify(user));
          this.currentUserSource.next(user);
        }
      })
    )
  } 

  register(user: User) {
    return this.postModel(user).pipe(
      map((user: User) => { 
        if (user) {
          localStorage.setItem('user', JSON.stringify(user));
          this.currentUserSource.next(user);
        }
      })
    )
  }

  logout() {
    localStorage.removeItem('user');
    this.currentUserSource.next(null);
  }

  setCurrentUser(user: User) {
    this.currentUserSource.next(user);
  }
}
