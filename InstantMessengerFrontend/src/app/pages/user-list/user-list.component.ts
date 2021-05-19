import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/fetch/auth.service';
import { UserService } from 'src/app/services/fetch/user.service';
import { User } from 'src/app/models/fetch/user';
import { Friendship } from 'src/app/models/helpers/friendship';
import { FriendshipService } from 'src/app/services/fetch/friendship.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {
  users: User [] = [];
  friends: Friendship [] = [];
  constructor(
     private userService: UserService,
     private authService: AuthService, 
     private friendshipSerivce: FriendshipService) {}

  ngOnInit() {
    this.initializeUserList();
    this.initializeFriendships();
  }

  initializeUserList() {
    this.userService.getModels().subscribe((response) => {
      this.users = response.filter(user => user.id !== this.authService.getCurrentUser().id);
    })
  }

  initializeFriendships() {
    this.friendshipSerivce.getAllFriends(1).subscribe((response) => {
      this.friends = response.filter(friend => friend.accepted === true);
    })
  }
}
