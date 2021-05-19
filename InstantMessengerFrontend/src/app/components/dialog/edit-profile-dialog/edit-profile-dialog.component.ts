import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { GenderType } from 'src/app/enums/gender-type.enum';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/fetch/user.service';

@Component({
  selector: 'app-edit-profile-dialog',
  templateUrl: './edit-profile-dialog.component.html',
  styleUrls: ['./edit-profile-dialog.component.scss']
})
export class EditProfileDialogComponent implements OnInit {
  model: User;
  userForm: FormGroup;
  selectedGender: GenderType;
  genderType = GenderType;
  avatar: File;

  constructor(@Inject(MAT_DIALOG_DATA) data: User,
   private formBuilder: FormBuilder, private userService: UserService) { 
     this.model = data;
   }

  ngOnInit() {
    this.buildUserForm();
  }

  submitUserForm() {
    this.userForm.get("birthday").setValue(null); //TODO
    this.userService.postModel(this.userForm.value).subscribe();
  }

  private buildUserForm() {
    this.userForm = this.formBuilder.group({
      id: this.model.id, //TODO
      firstName: [this.model.firstName, [Validators.required]],
      lastName: [this.model.lastName, [Validators.required]],
      country: [this.model.country],
      city: [this.model.city],
      birthday: [this.model.birthday],
      gender: [this.model.gender],
      phone: [this.model.phone],
      mail: [this.model.mail],
      presentation: [this.model.presentation],
    })
  }

  updateSelectedGender() {
    this.selectedGender = this.userForm.get("gender").value;
  }

  onAvatarChange(event) {
    this.avatar = event.target.files[0];   
  }
}
