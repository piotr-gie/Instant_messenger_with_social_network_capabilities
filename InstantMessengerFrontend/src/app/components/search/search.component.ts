import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { GenderType } from 'src/app/enums/gender-type.enum';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';
import { from, Observable } from 'rxjs';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
  encapsulation : ViewEncapsulation.None
})
export class SearchComponent implements OnInit {
  show: boolean;
  users: User [] = [];
  usersSearchList: User [] = [];
  // users: Observable<User>
  usersSearch: Observable<User>
  genderType = GenderType;
  avatar: File;

  constructor(private userService: UserService, private router: Router) { }

  ngOnInit(): void {
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

  search($event){
    let input = $event.target.value;
    let userList: User [] = [];
    const sauce = from(this.users);

    sauce.pipe(filter(user => user.firstName.includes(input) || user.lastName.includes(input)))
    .subscribe(us => userList.push(us));

    this.usersSearchList = userList;
  }
}
