import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { TextBoxType } from 'src/app/enums/message-box-type.enum';
import { Message } from 'src/app/models/fetch/message';
import { User } from 'src/app/models/fetch/user';
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
  currentUser: User;

  textBoxTypeEnum = TextBoxType
  uploadForm: FormGroup;

  constructor(
    private messageService: MessageService,
    private authService: AuthService,
    private userSerivce: UserService) {}

  ngOnInit(): void {
    this.initCurrentUser();
    this.initConversation();
    this.initFriends();
  }

  initCurrentUser() {
    this.authService.currentUser$.subscribe((res) => {
      this.currentUser = res;
    })
  }

  sendMessage(message: Message) {
    const formData = new FormData();

    formData.append('content', message.content)
    formData.append('senderId', (this.currentUser.id).toString())
    formData.append('receiverId', this.user.id.toString())

    for(let i = 0; i < message.attachments.length; i ++) {
      formData.append('files', message.attachments[i], message.attachments[i].name);
    } 
    
    this.messageService.sendMessage(formData).subscribe(() => {   
      this.initConversation();
    }); 
  }

  private initConversation() {
    this.messageService.getAllMessagesInConversationByUsers(this.currentUser.id, this.user.id).subscribe((res) => {
      this.messages = res;
    });
  }

  private initFriends() {
    this.userSerivce.getModels().subscribe((res) => {
      this.friends = res;
    })
  }

  close() {
    this.closeEmit.emit();
  }  
}
