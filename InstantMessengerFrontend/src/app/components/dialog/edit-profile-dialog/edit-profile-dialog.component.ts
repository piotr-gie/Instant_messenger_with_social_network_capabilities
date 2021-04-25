import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { GenderType } from 'src/app/enums/gender-type.enum';
import { User } from 'src/app/models/user';

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
   private formBuilder: FormBuilder) { 
     this.model = data;
   }

  ngOnInit() {
    this.buildUserForm();
  }

  submitUserForm() {
    //TODO: Update user profile
    console.log(this.userForm.value)
  }

  private buildUserForm() {
    this.userForm = this.formBuilder.group({
      firstName: [this.model.firstName, [Validators.required]],
      lastName: [this.model.lastName, [Validators.required]],
      country: [this.model.country],
      city: [this.model.city],
      birthday: [this.model.birthday],
      gender: [this.model.gender],
      mobile: [this.model.mobile],
      email: [this.model.email],
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
