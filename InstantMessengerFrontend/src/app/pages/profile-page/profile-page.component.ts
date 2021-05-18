import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EditProfileDialogComponent } from 'src/app/components/dialog/edit-profile-dialog/edit-profile-dialog.component';
import { GenderType } from 'src/app/enums/gender-type.enum';
import { User } from 'src/app/models/user';
import { ChatBoxService } from 'src/app/services/chat-box.service';
import { DialogWindowService } from 'src/app/services/dialog-window.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.scss']
})
export class ProfilePageComponent {
  model: User;
  genderType = GenderType;
  avatar: File;

  constructor(private userService: UserService,
    private dialogService: DialogWindowService,
    private activatedRoute: ActivatedRoute,
    private chatBoxSerice: ChatBoxService
    ) {}
  
  ngOnInit() {
    this.initializeUserProfile();  
  }

  initializeUserProfile() {
    let userId;
    this.activatedRoute.paramMap.subscribe(params => { 
      userId = params.get('id');
    })
    this.userService.getModel(userId).subscribe((response) => {
      this.model = response;
      this.model.birthday = new Date();
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
}
