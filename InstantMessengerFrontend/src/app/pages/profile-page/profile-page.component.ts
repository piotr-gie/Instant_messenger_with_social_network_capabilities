import { Component } from '@angular/core';
import { EditProfileDialogComponent } from 'src/app/components/dialog/edit-profile-dialog/edit-profile-dialog.component';
import { GenderType } from 'src/app/enums/gender-type.enum';
import { User } from 'src/app/models/user';
import { DialogWindowService } from 'src/app/services/dialog-window.service';

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.scss']
})
export class ProfilePageComponent {
  model: User;
  genderType = GenderType;

  constructor(private dialogService: DialogWindowService) {
    //TODO: remove mock
    this.model = {
      firstName: "John",
      lastName: "Smith",
      country: "Poland",
      city: "Warsaw",
      birthday: new Date(),
      gender: this.genderType.male,
      mobile: "502 421 210",
      email: "john.smith@gmail.com",
      presentation: '"My short presentation should be here"',
    }
   }

  openEditDialog() {
    this.dialogService.openDialogWindow(EditProfileDialogComponent, this.model, (data) => { 
      if(data != null)  {
        this.model = data;
      }
    });  
  }
}
