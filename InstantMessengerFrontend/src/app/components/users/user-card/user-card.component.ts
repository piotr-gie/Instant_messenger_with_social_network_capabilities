import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GenderType } from 'src/app/enums/gender-type.enum';
import { User } from 'src/app/models/fetch/user';
import { ChatBoxService } from 'src/app/services/functional/chat-box.service';

@Component({
  selector: 'app-user-card',
  templateUrl: './user-card.component.html',
  styleUrls: ['./user-card.component.scss']
})
export class UserCardComponent implements OnInit {
  @Input() model: User;

  genderType = GenderType;
  avatar: File;

  constructor(private chatBoxSerice: ChatBoxService,
    private router: Router) { }

  ngOnInit() {
  }

  showUserProfile(id: number) {
    this.router.navigate(['/profile', id])
  }

  openConversation(userId: number) {
    this.chatBoxSerice.openChatBox(userId);
  }

}
