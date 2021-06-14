import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/models/fetch/user';
import { AuthService } from 'src/app/services/fetch/auth.service';


@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {
  currentUser: User;

  constructor(private router: Router, private authService: AuthService) { }

  ngOnInit() {
    this.initCurrentUser();
  }

  initCurrentUser() {
    this.authService.currentUser$.subscribe((res) => {
      this.currentUser = res;
    })
  }

}
