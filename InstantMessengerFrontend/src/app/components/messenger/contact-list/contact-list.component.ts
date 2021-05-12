import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Observable } from 'rxjs';
import { GenderType } from 'src/app/enums/gender-type.enum';
import { ContactHelper } from 'src/app/helpers/contactHelper';
import { User } from 'src/app/models/user';
import { MessageService } from 'src/app/services/message.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.scss']
})
export class ContactListComponent implements OnInit {
  @Output() hideEmit: EventEmitter<File> = new EventEmitter();
  users: User [] = [];
  contacts: ContactHelper [] = [];

  selectedUser: User;

  genderType = GenderType;

  constructor(private userService: UserService,
    private messageService: MessageService) {}

  ngOnInit() {
    this.initializeContactList();
  }

  initializeUsers() {
   
  }

  initializeContactList() {
    //TODO: Get only friends
    this.userService.getModels().subscribe((response) => {
      this.users = response;
      response.forEach((user) => {
        this.messageService.getAllMessagesInConversationByUsers(1, user.id).subscribe((response) => {
          let timestamp = response[0]?.date
          this.contacts.push({user: user, date: timestamp})
        });      
      })
    })
  }

  hidePanel() { 
    this.hideEmit.emit();
  }

  selectUser(user: User) {
    this.selectedUser = user;
  }
}
