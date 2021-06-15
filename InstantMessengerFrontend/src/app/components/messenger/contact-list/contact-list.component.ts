import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ContactHelper } from 'src/app/models/helpers/contactHelper';
import { ChatBoxService } from 'src/app/services/functional/chat-box.service';
import { FriendshipService } from 'src/app/services/fetch/friendship.service';
import { MessageService } from 'src/app/services/fetch/message.service';
import { User } from 'src/app/models/fetch/user';
import { BehaviorSubject } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { Friendship } from 'src/app/models/helpers/friendship';
import { AuthService } from 'src/app/services/fetch/auth.service';

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
  currentUser: User;

  searchValue$ = new BehaviorSubject<string>('');
  

  constructor(
    private messageService: MessageService,
    private chatBoxService: ChatBoxService,
    private friendshipService: FriendshipService,
    private authService: AuthService) {}

  ngOnInit() {
    this.initCurrentUser();
    this.initializeContactList(); 

    if(this.selectedUser) {
      this.selectUser(this.selectedUser);
    }
    else this.selectedUser = null;
  }

  initCurrentUser() {
    this.authService.currentUser$.subscribe((res) => {
      this.currentUser = res;
    })
  }

  initializeContactList() {
    this.friendshipService.getAllFriends(this.currentUser.id).subscribe((res) => {
      this.friends = res.filter(friend => friend.accepted === true);
      this.chatBoxService.selectedUserId.subscribe((id) => {
        if (id !== null) {
          this.selectedUser = res.find(friend => friend.user.id === id).user;
        }     
      })   
      res.forEach((friend) => {
        this.messageService.getAllMessagesInConversationByUsers(1, friend.user.id).subscribe((res) => {
          let timestamp = res[0]?.date
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

  clearSearchInput() {
    this.searchValue$.next('');
  }

  search(value: string) {
    this.searchValue$.next(value);
    this.searchValue$.pipe(
      debounceTime(400),
      distinctUntilChanged()
    ).subscribe(() => {     
      this.filteredContacts = this.contacts.filter((contact) => {
        return (contact.user.firstName + ' ' + contact.user.lastName)?.toLocaleLowerCase().match(this.searchValue$.value);
      }) 
    })
  }
}
