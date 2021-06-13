
import { Component, Input, OnInit } from '@angular/core';
import { TextBoxType } from 'src/app/enums/message-box-type.enum';
import { Message } from 'src/app/models/fetch/message';
import { User } from 'src/app/models/fetch/user';
import { AuthService } from 'src/app/services/fetch/auth.service';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.scss']
})
export class MessageComponent implements OnInit{
  @Input() model: Message;
  currentUser: User;
  isDateShown: boolean;
  isMouseEnetered: boolean;
  textBoxType: TextBoxType;

  textBoxTypeEnum = TextBoxType;
  
  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.initCurrentUser();
    this.textBoxType = (this.model.senderId === this.currentUser.id) ?
      this.textBoxTypeEnum.sent : this.textBoxTypeEnum.recived;
  }

  initCurrentUser() {
    this.authService.currentUser$.subscribe((res) => {
      this.currentUser = res;
    })
  }

  showDate(): void {
    this.isMouseEnetered = true
    setTimeout(() => {this.isDateShown = true}, 2000)
  }

  hideDate(): void {
    this.isMouseEnetered = false
    this.isDateShown = false
  }
}
