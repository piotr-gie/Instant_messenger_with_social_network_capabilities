import { Component, OnInit, ViewEncapsulation, HostListener, ElementRef } from '@angular/core';
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

  constructor(private userService: UserService, private router: Router, private elementRef: ElementRef) {
    this.input = "";
  }

  @HostListener('document:click', ['$event.target'])
  clickedOut(targetElement) {
    const clickedInside = this.elementRef.nativeElement.contains(targetElement);
    
    if(!clickedInside)
      this.show = clickedInside;
  }

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
    if ($event.key != "Enter") {
      // this.input = $event.target.value;
      let userList: User [] = [];
      const sauce = from(this.users);

      sauce.pipe(filter(user => user.firstName.toLowerCase().includes(this.input.toLowerCase()) || 
        user.lastName.toLowerCase().includes(this.input.toLowerCase()) || 
        (user.firstName.toLowerCase() + " " + user.lastName.toLowerCase()).includes(this.input.toLowerCase())))
      .subscribe(us => userList.push(us));

      this.usersSearchList = userList;
    }
  }
}
