import { Component, Input, OnInit } from '@angular/core';
import { GenderType } from 'src/app/enums/gender-type.enum';
import { User } from 'src/app/models/fetch/user';

@Component({
  selector: 'app-user-avatar',
  templateUrl: './user-avatar.component.html',
  styleUrls: ['./user-avatar.component.scss']
})
export class UserAvatarComponent {
  @Input() user: User;
  @Input() isRound: boolean;
  @Input() isNav: boolean;
  @Input() isShadowless: boolean;
  @Input() size: number = 100;

  genderType = GenderType;
}
