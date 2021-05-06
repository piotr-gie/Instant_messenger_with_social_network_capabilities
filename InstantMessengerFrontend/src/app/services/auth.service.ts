import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { User } from '../models/user';
import { BaseService } from './base.service';
import { map } from 'rxjs/operators';
import { ReplaySubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService extends BaseService<User> {
loggedIn: boolean;
private currentUserSource = new ReplaySubject<User>(1);
currentUser$ = this.currentUserSource.asObservable()

 constructor(http: HttpClient) {
      super(http);
      this.controllerPath = "users";
    this.login(null);
  }

  login(user: User) {
    // return this.postModel(user).pipe(
    //   map((respose: User) => {
    //     const user = respose;
    //     if (user) {
    //       localStorage.setItem('user', JSON.stringify(user));
    //       this.currentUserSource.next(user);
    //     }
    //   })
    // )
    this.currentUserSource.next({ firstName: "Johny", lastName: "Baker", id: 1 }) //TODO: to remove after login imp
    if(this.currentUser$ != null) { 
      this.loggedIn = true;
    } 
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

  getCurrentUserId(): number {
    // let id;
    // this.currentUser$.subscribe((response) => {
    //   id = response.id;
    // })
   return 1; //TODO
  }
}
