import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Observable, Subscription } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
  encapsulation : ViewEncapsulation.None
})
export class NavbarComponent implements OnInit {
  authService: AuthService;

  constructor(
    authService: AuthService,
    private toastrService: ToastrService) {
    this.authService = authService
   }

  ngOnInit() {
    
  }

  logout() {
    this.authService.logout().subscribe((response) => {
      this.toastrService.info("Logged out")
    });

  }

}
