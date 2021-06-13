import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GenderType } from 'src/app/enums/gender-type.enum';
import { User } from 'src/app/models/fetch/user';
import { AuthService } from 'src/app/services/fetch/auth.service';
import { FriendshipService } from 'src/app/services/fetch/friendship.service';
import { ChatBoxService } from 'src/app/services/functional/chat-box.service';

@Component({
  selector: 'app-user-card',
  templateUrl: './user-card.component.html',
  styleUrls: ['./user-card.component.scss']
})
export class UserCardComponent implements OnInit {
  @Input() model: User;
  currentUser: User;
  mutalFriends: number;
  constructor(
    private chatBoxSerice: ChatBoxService,
    private friendshipService: FriendshipService,
    private authService: AuthService,
    private router: Router) { }

  ngOnInit() {
    this.initCurrentUser();
    this.getMutalFriendsCount();
  }

  initCurrentUser() {
    this.authService.currentUser$.subscribe((res) => {
      this.currentUser = res;
    })
  }

  showUserProfile(id: number) {
    this.router.navigate(['/profile', id])
  }

  openConversation(userId: number) {
    this.chatBoxSerice.openChatBox(userId);
  }

  getMutalFriendsCount() {
    let loggedUserFriends = [];
    this.friendshipService.getAllFriends(this.currentUser.id).subscribe((res) => {
      loggedUserFriends = res;
      this.friendshipService.getAllFriends(this.model.id).subscribe((res) => {
        this.mutalFriends = res.filter(
          friendship => loggedUserFriends.find(
            loggedFriendship => loggedFriendship.user.id === friendship.user.id)).length;
      })
    })
    

  }

}
