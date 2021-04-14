import { Component, OnInit } from '@angular/core';
import { TextBoxType } from 'src/app/enums/message-box-type.enum';
import { Message } from 'src/app/helpers/message';

@Component({
  selector: 'app-chat-box',
  templateUrl: './chat-box.component.html',
  styleUrls: ['./chat-box.component.scss']
})
export class ChatBoxComponent {
  messages: any [] = [];
  firstAndLastName = "John Smith"

  textBoxTypeEnum = TextBoxType

  sendMessage(message: Message) {

    //TODO: to implement
    const x = this.getRandomInt(0, 1);
    const messtype = x === 1 ? this.textBoxTypeEnum.sent : this.textBoxTypeEnum.recived
    console.log(messtype);

    this.messages.push({message: message, textBoxType: messtype});
  }

  //TODO: to remove
  getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
}
