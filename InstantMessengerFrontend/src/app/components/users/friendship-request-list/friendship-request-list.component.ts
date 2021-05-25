import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { GenderType } from 'src/app/enums/gender-type.enum';
import { Friendship } from 'src/app/models/helpers/friendship';
import { FriendshipService } from 'src/app/services/fetch/friendship.service';

@Component({
  selector: 'app-friendship-request-list',
  templateUrl: './friendship-request-list.component.html',
  styleUrls: ['./friendship-request-list.component.scss']
})
export class FriendshipRequestListComponent implements OnInit {
  @Input() friendshipsRequests: Friendship [] = [];

  genderType = GenderType;

  constructor(private friendshipService: FriendshipService,
    private toastrService: ToastrService,
    private router: Router) {}

  ngOnInit() {
    this.initializeFriendships();
  }

  initializeFriendships() {
    this.friendshipService.getAllFriends(1).subscribe((response) => {
      this.friendshipsRequests = response.filter(friend => friend.accepted === false)
    })
  }

  acceptRequest(senderId: number) {
    this.friendshipService.acceptFriendship(senderId, 1).subscribe(() => {
      this.toastrService.success("Friendship accepted!")
    })
  }

  declineRequest(senderId: number) {
    this.friendshipService.deleteFriendship(senderId, 1).subscribe(() => {
      this.toastrService.warning("Friendship declined")
    })
  }

  showUserProfile(id: number) {
    this.router.navigate(['/profile', id])
  }
}
