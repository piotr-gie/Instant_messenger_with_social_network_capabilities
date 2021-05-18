import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GenderType } from 'src/app/enums/gender-type.enum';
import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth.service';
import { ChatBoxService } from 'src/app/services/chat-box.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {
  users: User [] = [];

  genderType = GenderType;
  avatar: File;

  constructor(
     private userService: UserService,
     private router: Router,
     private authService: AuthService,
     private chatBoxSerice: ChatBoxService) {}

  ngOnInit() {
    this.initializeUserList();
  }

  initializeUserList() {
    this.userService.getModels().subscribe((response) => {
      this.users = response.filter(user => user.id !== this.authService.getCurrentUser().id);
    })
  }

  showUserProfile(id: number) {
    this.router.navigate(['/profile', id])
  }

  openConversation(userId: number) {
    this.chatBoxSerice.openChatBox(userId);
  }

}
