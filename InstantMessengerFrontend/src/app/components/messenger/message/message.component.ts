
import { Component, Input, OnInit } from '@angular/core';
import { TextBoxType } from 'src/app/enums/message-box-type.enum';
import { Message } from 'src/app/models/fetch/message';
import { AuthService } from 'src/app/services/fetch/auth.service';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.scss']
})
export class MessageComponent implements OnInit{
  @Input() model: Message;
  isDateShown: boolean;
  isMouseEnetered: boolean;
  textBoxType: TextBoxType;

  textBoxTypeEnum = TextBoxType;

  constructor(private authService: AuthService) {}

  ngOnInit(): void {

    this.textBoxType = (this.model.senderId === this.authService.getCurrentUser().id) ?
      this.textBoxTypeEnum.sent : this.textBoxTypeEnum.recived;
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
