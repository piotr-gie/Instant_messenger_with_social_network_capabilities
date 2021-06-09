import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
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

  genderType = GenderType;
  textBoxTypeEnum = TextBoxType
  uploadForm: FormGroup;

  constructor(
    private messageService: MessageService,
    private authService: AuthService,
    private userSerivce: UserService) {}

  ngOnInit(): void {
    this.initConversation();
    this.initFriends();
  }

  sendMessage(message: Message) {
    const formData = new FormData();

    formData.append('content', message.content)
    formData.append('senderId', (this.authService.getCurrentUser().id).toString())
    formData.append('receiverId', this.user.id.toString())

    for(let i = 0; i < message.attachments.length; i ++) {
      formData.append('files', message.attachments[i], message.attachments[i].name);
    } 
    
    this.messageService.sendMessage(formData).subscribe(() => {   
      this.initConversation();
    }); 
  }

  private initConversation() {
    this.messageService.getAllMessagesInConversationByUsers(1, this.user.id).subscribe((response) => {
      this.messages = response;
    });
  }

  private initFriends() {
    this.userSerivce.getModels().subscribe((response) => {
      this.friends = response;
    })
  }

  close() {
    this.closeEmit.emit();
  }  
}
