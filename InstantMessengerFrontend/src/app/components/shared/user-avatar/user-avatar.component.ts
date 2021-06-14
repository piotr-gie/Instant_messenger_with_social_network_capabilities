import { Component, Input, OnInit } from '@angular/core';
import { GenderType } from 'src/app/enums/gender-type.enum';
import { User } from 'src/app/models/fetch/user';
import { UserService } from 'src/app/services/fetch/user.service';

@Component({
  selector: 'app-user-avatar',
  templateUrl: './user-avatar.component.html',
  styleUrls: ['./user-avatar.component.scss']
})
export class UserAvatarComponent implements OnInit {
  @Input() user: User; 
  @Input() userId: number;
  @Input() isRound: boolean;
  @Input() isNav: boolean;
  @Input() isShadowless: boolean;
  @Input() size: number = 100;

  genderType = GenderType;

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    if(this.userId) {
      this.userService.getModel(this.userId).subscribe((res) => {
        this.user = res;
      }) 
    } 
  }
}
