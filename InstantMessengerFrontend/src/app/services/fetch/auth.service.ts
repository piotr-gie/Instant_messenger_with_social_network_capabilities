import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BaseService } from './base.service';
import { map } from 'rxjs/operators';
import { Observable, ReplaySubject } from 'rxjs';
import { User } from 'src/app/models/fetch/user';
import { UserService } from './user.service';
import { JwtHelperService } from '@auth0/angular-jwt';


@Injectable({
  providedIn: 'root'
})
export class AuthService extends BaseService<User> {
private currentUserSource = new ReplaySubject<User>(1);
currentUser$ = this.currentUserSource.asObservable()

 constructor(http: HttpClient,
   private userService: UserService,
   private jwtHelper: JwtHelperService) {
      super(http);
      this.controllerPath = "login";   
  }
  login(mail: string, password: string) : Observable<any> {
    let user;
    let formData = new FormData();
    formData.append('mail', mail);
    formData.append('password', password); 

    this.userService.getModels().subscribe((res) => { //to update
      user = res.find(u => u.mail === mail)
      this.setCurrentUser(user);
    })
    return this.http.post<any>(this.baseUrl + this.controllerPath, formData);
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
    localStorage.removeItem('token')
    this.currentUserSource.next(null);
    return this.currentUserSource;
  }

  setCurrentUser(user: User) {
    localStorage.setItem('user', JSON.stringify(user));
    this.currentUserSource.next(user);
  }

  public setToken(token: string) {
    localStorage.setItem('token', token);
  }

  public getToken(): string {
    return localStorage.getItem('token');
  }

  public isAuthenticated(): boolean {
    const token = this.getToken();
    return this.jwtHelper.isTokenExpired(token);
  }
}
