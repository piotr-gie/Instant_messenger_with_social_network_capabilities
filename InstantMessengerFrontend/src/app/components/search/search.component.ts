import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { GenderType } from 'src/app/enums/gender-type.enum';
import { UserService } from 'src/app/services/fetch/user.service';
import { from, Observable } from 'rxjs';
import { filter } from 'rxjs/operators';
import { User } from 'src/app/models/fetch/user';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
  encapsulation : ViewEncapsulation.None
})
export class SearchComponent implements OnInit {
  show: boolean;
  input: string;
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

  showSearchResults(){
    this.router.navigate(['/search', this.input]);
  }

  search($event){
    this.input = $event.target.value;
    let userList: User [] = [];
    const sauce = from(this.users);

    sauce.pipe(filter(user => user.firstName.includes(this.input) || user.lastName.includes(this.input)))
    .subscribe(us => userList.push(us));

    this.usersSearchList = userList;
  }
}
