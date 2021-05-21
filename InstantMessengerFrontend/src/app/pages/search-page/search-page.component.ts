import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GenderType } from 'src/app/enums/gender-type.enum';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';
import { from } from 'rxjs';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-search-page',
  templateUrl: './search-page.component.html',
  styleUrls: ['./search-page.component.scss']
})
export class SearchPageComponent implements OnInit {
  users: User [] = [];
  usersSearchList: User [] = [];
  name: string;
  genderType = GenderType;
  avatar: File;

  constructor(private userService: UserService, 
    private router: Router, 
    private activatedRoute: ActivatedRoute) { 
      activatedRoute.params.subscribe(val => this.ngOnInit())
    }

  ngOnInit(): void {
    this.updateSearchResults();
  }

  updateSearchResults(){
    let userList: User [] = [];

    this.activatedRoute.paramMap.subscribe(params => { 
      this.name = params.get('name');
    });

    this.userService.getModels().subscribe((response) => {
      this.users = response;
    });

    const sauce = from(this.users);

    sauce.pipe(filter(user => user.firstName.includes(this.name) || user.lastName.includes(this.name)))
    .subscribe(us => userList.push(us));

    this.usersSearchList = userList;
  }

  showUserProfile(id: number) {
    this.router.navigate(['/profile', id])
  }
}
