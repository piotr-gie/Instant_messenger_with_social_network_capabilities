import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GenderType } from 'src/app/enums/gender-type.enum';
import { User } from 'src/app/models/user';
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

  constructor(private userService: UserService, private router: Router) { }

  ngOnInit() {
    this.initializeUserList();
  }

  initializeUserList() {
    this.userService.getModels().subscribe((response) => {
      this.users = response;
    })
  }

  showUserProfile(id: number) {
    this.router.navigate(['/profile', id])
  }

}
