import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { User } from 'src/app/models/fetch/user';
import { Friendship } from 'src/app/models/helpers/friendship';
import { AuthService } from 'src/app/services/fetch/auth.service';
import { FriendshipService } from 'src/app/services/fetch/friendship.service';

@Component({
  selector: 'app-friendship-request-list',
  templateUrl: './friendship-request-list.component.html',
  styleUrls: ['./friendship-request-list.component.scss']
})
export class FriendshipRequestListComponent implements OnInit {
  @Input() friendshipsRequests: Friendship [] = [];
  currentUser: User;

  constructor(private friendshipService: FriendshipService,
    private toastrService: ToastrService,
    private router: Router,
    private authService: AuthService) {}

  ngOnInit() {
    this.initCurrentUser();
    this.initializeFriendships();
  }

  initCurrentUser() {
    this.authService.currentUser$.subscribe((res) => {
      this.currentUser = res;
    })
  }

  initializeFriendships() {
    this.friendshipService.getAllFriends(this.currentUser.id).subscribe((res) => {
      this.friendshipsRequests = res.filter(friend => friend.accepted === false)
    })
  }

  acceptRequest(senderId: number) {
    this.friendshipService.acceptFriendship(senderId, this.currentUser.id).subscribe(() => {
      this.toastrService.success("Friendship accepted!")
      this.initializeFriendships();    
    })
  }

  declineRequest(senderId: number) {
    this.friendshipService.deleteFriendship(senderId, this.currentUser.id).subscribe(() => {
      this.toastrService.warning("Friendship declined")
      this.initializeFriendships();
    })
  }

  showUserProfile(id: number) {
    this.router.navigate(['/profile', id])
  }
}
