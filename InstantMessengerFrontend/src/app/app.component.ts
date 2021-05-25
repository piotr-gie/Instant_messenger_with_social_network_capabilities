import { Component } from '@angular/core';
import { User } from './models/fetch/user';
import { AuthService } from './services/fetch/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.setCurrentUser();
  }

  setCurrentUser() {
    const user: User = JSON.parse(localStorage.getItem('user'));
    this.authService.setCurrentUser(user);
  }
}
