import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { GenderType } from 'src/app/enums/gender-type.enum';
import { TextBoxType } from 'src/app/enums/message-box-type.enum';
import { Message } from 'src/app/models/fetch/message';
import { User } from 'src/app/models/fetch/user';
import { MessageHelper } from 'src/app/models/helpers/messageHelper';
import { AuthService } from 'src/app/services/fetch/auth.service';
import { MessageService } from 'src/app/services/fetch/message.service';
import { UserService } from 'src/app/services/fetch/user.service';

@Component({
  selector: 'app-chat-box',
  templateUrl: './chat-box.component.html',
  styleUrls: ['./chat-box.component.scss']
})
export class ChatBoxComponent implements OnInit{
  @Output() closeEmit: EventEmitter<File> = new EventEmitter();
  
  @Input() user: User;
  @Input() friends: User [] = [];
  messages: Message [] = [];
  firstAndLastName = "John Smith"

  genderType = GenderType;
  textBoxTypeEnum = TextBoxType

  constructor(
    private messageService: MessageService,
    private authService: AuthService,
    private userSerivce: UserService) {}

  ngOnInit(): void {
    this.userSerivce.getModels().subscribe((response) => {
      this.friends = response;
    })

    this.messageService.getAllMessagesInConversationByUsers(1, this.user.id).subscribe((response) => {
      this.messages = response;
    });
  }

  sendMessage(messageHelper: MessageHelper) {

    let message = {
      content: messageHelper.content,
      senderId: this.authService.getCurrentUser().id,
      attachment: { files: messageHelper.files }, 
      date: new Date()
    }

    this.messages.push(message);
    
    this.messageService.sendMessage(
      {
        content: messageHelper.content,
        senderId: this.authService.getCurrentUser().id,
        attachment: null, 
        date: new Date()
      }, this.authService.getCurrentUser().id, this.user.id).subscribe((response) => {
        
      })
  }

  close() {
    this.closeEmit.emit();
  }

}
