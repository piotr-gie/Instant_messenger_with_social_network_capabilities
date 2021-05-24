import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { GenderType } from 'src/app/enums/gender-type.enum';
import { ContactHelper } from 'src/app/models/helpers/contactHelper';
import { ChatBoxService } from 'src/app/services/functional/chat-box.service';
import { FriendshipService } from 'src/app/services/fetch/friendship.service';
import { MessageService } from 'src/app/services/fetch/message.service';
import { UserService } from 'src/app/services/fetch/user.service';
import { User } from 'src/app/models/fetch/user';
import { BehaviorSubject } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { Friendship } from 'src/app/models/helpers/friendship';

@Component({
  selector: 'app-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.scss']
})
export class ContactListComponent implements OnInit {
  @Output() hideEmit: EventEmitter<File> = new EventEmitter();
  friends: Friendship [] = [];
  contacts: ContactHelper [] = [];
  filteredContacts: ContactHelper [] = [];
  selectedUser: User;

  searchValue$ = new BehaviorSubject<string>('');
  
  genderType = GenderType;

  constructor(
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
    this.friendshipService.getAllFriends(1).subscribe((response) => {
      this.friends = response.filter(friend => friend.accepted === true);
      this.chatBoxService.selectedUserId.subscribe((id) => {
        this.selectedUser = response.find(friend => friend.user.id === id).user; 
      })   
      response.forEach((friend) => {
        this.messageService.getAllMessagesInConversationByUsers(1, friend.user.id).subscribe((response) => {
          let timestamp = response[0]?.date
          this.contacts.push({user: friend.user, date: timestamp})
          this.filteredContacts = this.contacts; 
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

  search(value: string) {
    const search = this.searchValue$.getValue(); 

    this.searchValue$.next(value);
    this.searchValue$.pipe(
      debounceTime(400),
      distinctUntilChanged()
    ).subscribe(() => {     
      this.filteredContacts = this.contacts.filter((contact) => {
        return (contact.user.firstName + ' ' + contact.user.lastName)?.toLocaleLowerCase().match(search);
      }) 
    })
  }
}
