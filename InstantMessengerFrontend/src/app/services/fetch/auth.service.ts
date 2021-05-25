import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BaseService } from './base.service';
import { map } from 'rxjs/operators';
import { Observable, ReplaySubject } from 'rxjs';
import { User } from 'src/app/models/fetch/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService extends BaseService<User> {
loggedIn: boolean;
private currentUserSource = new ReplaySubject<User>(1);
currentUser$ = this.currentUserSource.asObservable()

 constructor(http: HttpClient) {
      super(http);
      this.controllerPath = "user";
      
  }
  login(user: User): Observable<User> {
    // return this.postModel(user).pipe(
    //   map((respose: User) => {
    //     const user = respose;
    //     if (user) {
    //       localStorage.setItem('user', JSON.stringify(user));
    //       this.currentUserSource.next(user);
    //     }
    //   })
    // )
    this.currentUserSource.next({ firstName: "John", lastName: "Smith", id: 1 }) //TODO: to remove after login imp
    if(this.currentUser$ != null) { 
      this.loggedIn = true;  
    } 
    return this.currentUserSource;
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

  logout(): Observable<User>  {
    localStorage.removeItem('user');
    this.currentUserSource.next(null);
    return this.currentUserSource;
  }

  setCurrentUser(user: User) {
    this.currentUserSource.next(user);
  }

  getCurrentUser(): any {
    // let id;
    // this.currentUser$.subscribe((response) => {
    //   id = response.id;
    // })
    let user = { firstName: "John", lastName: "Smith", id: 1, country: "Germany", city: "Berlin", gender: "male"};
    return user; //TODO
  }
}
