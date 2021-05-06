import { Component, OnInit } from '@angular/core';
import { TextBoxType } from 'src/app/enums/message-box-type.enum';
import { MessageHelper } from 'src/app/helpers/messageHelper';
import { Message } from 'src/app/models/message';
import { AuthService } from 'src/app/services/auth.service';
import { MessageService } from 'src/app/services/message.service';

@Component({
  selector: 'app-chat-box',
  templateUrl: './chat-box.component.html',
  styleUrls: ['./chat-box.component.scss']
})
export class ChatBoxComponent implements OnInit{
  
  messages: Message [] = [];
  firstAndLastName = "John Smith"

  textBoxTypeEnum = TextBoxType

  constructor(private messageService: MessageService, private authService: AuthService) {}

  ngOnInit(): void {
    this.messageService.getAllMessagesInConversationByUsers(1, 2).subscribe((response) => {
      this.messages = response;
    });
  }

  sendMessage(messageHelper: MessageHelper) {

    let message = {
      content: messageHelper.content,
      senderId: this.authService.getCurrentUserId(),
      attachment: { files: messageHelper.files }, 
      date: new Date()
    }

    this.messages.push(message);
    
    this.messageService.sendMessage(
      {
        content: messageHelper.content,
        senderId: this.authService.getCurrentUserId(),
        attachment: null, 
        date: new Date()
      }, this.authService.getCurrentUserId(), 2).subscribe((response) => {
        
      })

  }


}
