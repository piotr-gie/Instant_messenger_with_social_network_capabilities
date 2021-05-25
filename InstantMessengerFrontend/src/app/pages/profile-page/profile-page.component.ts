import { Component } from '@angular/core';
import { ActivatedRoute} from '@angular/router';
import { EditProfileDialogComponent } from 'src/app/components/dialog/edit-profile-dialog/edit-profile-dialog.component';
import { GenderType } from 'src/app/enums/gender-type.enum';
import { User } from 'src/app/models/fetch/user';
import { ChatBoxService } from 'src/app/services/functional/chat-box.service';
import { UserService } from 'src/app/services/fetch/user.service';
import { DialogWindowService } from 'src/app/services/functional/dialog-window.service';
import { FriendshipService } from 'src/app/services/fetch/friendship.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.scss']
})
export class ProfilePageComponent {
  model: User;
  isFriend: boolean;
  genderType = GenderType;
  avatar: File;
  temp: any; //delete later

  constructor(
    private userService: UserService,
    private dialogService: DialogWindowService,
    private activatedRoute: ActivatedRoute,
    private chatBoxSerice: ChatBoxService,
    private friendshipService: FriendshipService,
    private toastrService: ToastrService
    ) {
      activatedRoute.params.subscribe(val => this.ngOnInit())
    }
  
  ngOnInit() {
    this.initializeUserProfile();  
  }

  initializeUserProfile() {
    let userId;
    this.activatedRoute.paramMap.subscribe(params => { 
      userId = params.get('id');
      this.temp = params.get('id'); //delete later (posts filtering)
    })
    this.userService.getModel(userId).subscribe((response) => {
      this.model = response;
      this.model.birthday = new Date();
      this.friendshipService.getAllFriends(1).subscribe((response) => {
        this.isFriend = response.some(
          friendship => friendship.user.id === this.model.id &&
          friendship.accepted === true
          )
      })
    })
  }

  openEditDialog() {
    this.dialogService.openDialogWindow(EditProfileDialogComponent, this.model, (data) => { 
      if(data != null)  {
        this.model = data;
      }
    });  
  }

  openConversation() {
    this.chatBoxSerice.openChatBox(this.model.id);
  }

  sendFriendRequest() {
    this.friendshipService.addFriendship(1, this.model.id).subscribe(() => {
      this.toastrService.warning("Friendship request sent!")
    })
  }

  cancelFriendship (senderId: number) {
    this.friendshipService.deleteFriendship(senderId, 1).subscribe(() => {
      this.toastrService.warning("Friendship canceled!")
    })
  }
}
