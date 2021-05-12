import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { GenderType } from 'src/app/enums/gender-type.enum';
import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
  encapsulation : ViewEncapsulation.None
})
export class NavbarComponent implements OnInit {
  user: User;
  authService: AuthService;
  chatTriggered: boolean = false;
  chatExpanded: boolean = false;
  expandTime: number = 200;
  avatar: File;

  genderType = GenderType;

  constructor(
    authService: AuthService,
    private toastrService: ToastrService) {
    this.authService = authService
   }

  ngOnInit() {
    this.initUser(); 
  }

  initUser() {
    this.authService.getCurrentUser().subscribe((response) => {
     this.user = response;
    })
  }

  logout() {
    this.authService.logout().subscribe(() => {
      this.toastrService.info("Logged out")
    });

  }

  toggleExpand(isHidding: boolean) {
    if(!this.chatExpanded || isHidding) {
      this.chatTriggered = !this.chatTriggered;
      setTimeout(() => { this.chatExpanded= !this.chatExpanded
      }, (this.chatExpanded ? 1 : 0) * this.expandTime);  
    }   
  }

}
