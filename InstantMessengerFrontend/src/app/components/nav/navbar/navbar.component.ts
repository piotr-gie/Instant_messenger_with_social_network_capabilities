import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { User } from 'src/app/models/fetch/user';
import { AuthService } from 'src/app/services/fetch/auth.service';
import { ChatBoxService } from 'src/app/services/functional/chat-box.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
  encapsulation : ViewEncapsulation.None
})
export class NavbarComponent implements OnInit, OnDestroy{
  currentUser: User;
  authService: AuthService;
  chatTriggered: boolean = false;
  chatExpanded: boolean = false;
  chatExpandTime: number = 200;
  avatar: File;
  subscriptions: Subscription [] = [];
  
  constructor(
    authService: AuthService,
    private toastrService: ToastrService, private chatBoxService: ChatBoxService) {
    this.authService = authService
   }

  ngOnInit() {
    this.initCurrentUser();
    this.subscriptions.push(this.chatBoxService.isChatBox.subscribe(res => {
      if(res.open == true && this.chatExpanded === false) {
        this.toggleChatExpand(false);
      }
    }))
  }

  initCurrentUser() {
    this.authService.currentUser$.subscribe((res) => {
      this.currentUser = res;
    })
  }
  
  logout() {
    this.authService.logout();  
    this.toastrService.info("Logged out");  
  }

  toggleChatExpand(isHidding: boolean) {
    if(!this.chatExpanded || isHidding) {
      this.chatTriggered = !this.chatTriggered;
      setTimeout(() => { this.chatExpanded= !this.chatExpanded
      }, (this.chatExpanded ? 1 : 0) * this.chatExpandTime);  
    }   
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((sub) => {
      sub.unsubscribe();
    })
  }
}
