import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface ConversationConfig {
  open: boolean;
  reciverId?: number
}

@Injectable({
  providedIn: 'root'
})
export class ChatBoxService {
  isChatBox = new BehaviorSubject<ConversationConfig>({open: false});
  selectedUserId = new BehaviorSubject<number>(null);

  openChatBox(userId: number) {
    this.isChatBox.next({open: true, reciverId: userId });
    this.selectedUserId.next(userId);
  }

  constructor() { }

}