import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { GenderType } from 'src/app/enums/gender-type.enum';
import { ContactHelper } from 'src/app/helpers/contactHelper';
import { User } from 'src/app/models/user';
import { ChatBoxService } from 'src/app/services/chat-box.service';
import { FriendshipService } from 'src/app/services/fetch/friendship.service';
import { MessageService } from 'src/app/services/fetch/message.service';
import { UserService } from 'src/app/services/fetch/user.service';

@Component({
  selector: 'app-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.scss']
})
export class ContactListComponent implements OnInit {
  @Output() hideEmit: EventEmitter<File> = new EventEmitter();
  friends: any [] = [];
  contacts: ContactHelper [] = [];
  selectedUser: User;

  genderType = GenderType;

  constructor(
    private userService: UserService,
    private messageService: MessageService,
    private chatBoxService: ChatBoxService,
    private friendshipService: FriendshipService) {}

  ngOnInit() {
    this.initializeContactList(); 

    if(this.selectedUser) {
      this.selectUser(this.selectedUser);
    }
  }

  initializeContactList() {
    //TODO: Get only friends

    this.friendshipService.getAllFriends(1).subscribe((response) => {
      this.friends = response.filter(friend => friend.accepted === true);
      console.log(this.friends);
      this.chatBoxService.selectedUserId.subscribe((id) => {
        this.selectedUser = response.find(user => user.id === id); 
      })  
      response.forEach((friend) => {
        this.messageService.getAllMessagesInConversationByUsers(1, friend.user.id).subscribe((response) => {
          let timestamp = response[0]?.date
          this.contacts.push({user: friend.user, date: timestamp})
        });      
      })
    })
  }

  hidePanel() { 
    this.hideEmit.emit();
    this.chatBoxService.selectedUserId.next(null);
  }

  selectUser(user: User) {
    this.selectedUser = user;
  }
}
