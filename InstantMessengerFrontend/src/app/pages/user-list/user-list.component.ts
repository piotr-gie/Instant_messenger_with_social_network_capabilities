import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/fetch/auth.service';
import { UserService } from 'src/app/services/fetch/user.service';
import { User } from 'src/app/models/fetch/user';
import { FriendshipService } from 'src/app/services/fetch/friendship.service';
import { GenderType } from 'src/app/enums/gender-type.enum';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { UserSearchService } from 'src/app/services/functional/user-search.service';

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
  isFriendsTab: boolean;

  isMyCity: boolean;
  isMyCountry: boolean;
  searchedGender: GenderType;

  genderType = GenderType;
  

  constructor(
     private userService: UserService,
     private authService: AuthService, 
     private friendshipSerivce: FriendshipService,
     public userSearch: UserSearchService) {}

  ngOnInit() {
    this.initializeUserList();
    this.initializeFriendships();
    this.search(this.userSearch.searchValue$.value);
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
      this.userList = this.users
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
    this.search(this.userSearch.searchValue$.getValue());
  }

  tabChange() {
    this.isFriendsTab = !this.isFriendsTab;
    this.userList = (this.isFriendsTab) ? this.friends : this.users;
    this.filteredList = this.userList;
    this.clearSearchInput();
  }

  clearSearchInput() {
    this.userSearch.searchValue$.next('');
  }

  search(value: string) {
    this.userSearch.searchValue$.next(value);
    this.userSearch.searchValue$.pipe(
      debounceTime(400),
      distinctUntilChanged()
    ).subscribe(() => {
      
      this.filteredList = (this.isFriendsTab) ? this.friends.filter((friend) => {
        return this.filterUser(friend)   
      }) :  this.users.filter((user) => {
        return this.filterUser(user)  
      });
    })
  }
  private filterUser(user: User) { 
    const search = this.userSearch.searchValue$.getValue(); 
    let currentUser = this.authService.getCurrentUser();
   
    const myCountryFilter = (this.isMyCountry) ? user.country === currentUser.country : true;
    const myCityFilter = (this.isMyCity) ? user.city === currentUser.city : true;
    const genderFilter = (this.searchedGender) ? user.gender === this.searchedGender : true;

    let filterResult = (((user.firstName + ' ' + user.lastName)?.toLocaleLowerCase().match(search) || 
      user.city?.toLocaleLowerCase().match(search) ||
      user.country?.toLocaleLowerCase().match(search)) &&
      myCountryFilter &&
      myCityFilter &&
      genderFilter
    );

    return filterResult;
  
  }
}
