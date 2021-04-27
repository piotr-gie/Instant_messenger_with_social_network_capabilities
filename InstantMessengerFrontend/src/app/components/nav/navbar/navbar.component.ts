import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
  encapsulation : ViewEncapsulation.None
})
export class NavbarComponent implements OnInit {
  authService: AuthService;

  constructor(authService: AuthService) {
    this.authService = authService
   }

  ngOnInit() {
    
  }

}
