import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/fetch/auth.service';
import { UserService } from 'src/app/services/fetch/user.service';
import { User } from 'src/app/models/fetch/user';
import { FriendshipService } from 'src/app/services/fetch/friendship.service';
import { GenderType } from 'src/app/enums/gender-type.enum';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {
  users: User [] = [];
  friends: User [] = [];
  userList: User [] = [];
  filteredList: User [] = [];
  isUsersTab: boolean;

  searchValue$ = new BehaviorSubject<string>('');
  isMyCity: boolean;
  isMyCountry: boolean;
  searchedGender: GenderType;

  genderType = GenderType;
  

  constructor(
     private userService: UserService,
     private authService: AuthService, 
     private friendshipSerivce: FriendshipService) {}

  ngOnInit() {
    this.initializeUserList();
    this.initializeFriendships();
  }

  initializeUserList() {
    this.userService.getModels().subscribe((response) => {
      this.users = response.filter(user => user.id !== this.authService.getCurrentUser().id);
    })
  }

  initializeFriendships() {
    this.friendshipSerivce.getAllFriends(1).subscribe((response) => {
      let friendships = response.filter(friend => friend.accepted === true);
      friendships.forEach(f => {
        this.friends.push(f.user);
      })
      this.userList = this.friends
      this.filteredList = this.userList;
    })
   
  }

  checkGenderState(event, elem) {
    event.preventDefault();
      if (this.searchedGender && this.searchedGender === elem.value) {
        elem.checked = false;
        this.searchedGender = null
      } else {
        this.searchedGender = elem.value
        elem.checked = true;
      }
  }

  tabChange() {
    this.isUsersTab = !this.isUsersTab;
    this.userList = (this.isUsersTab) ? this.users : this.friends;
    this.filteredList = this.userList;
    this.searchValue$.next('');
  }

  search(value: string) {
    this.searchValue$.next(value);
    this.searchValue$.pipe(
      debounceTime(400),
      distinctUntilChanged()
    ).subscribe(() => {
      
      this.filteredList = (this.isUsersTab) ? this.users.filter((user) => {
        return this.filterUser(user)   
      }) :  this.friends.filter((friend) => {
        return this.filterUser(friend)  
      });
    })
  }
  private filterUser(user: User) { 
    const search = this.searchValue$.getValue(); 

    return (user.firstName.toLocaleLowerCase().match(search) ||
    (user.firstName + ' ' + user.lastName)?.toLocaleLowerCase().match(search) || 
    user.city?.toLocaleLowerCase().match(search) ||
    user.country?.toLocaleLowerCase().match(search))  
  }
}
