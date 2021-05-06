import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Message } from '../models/message';
import { BaseService } from './base.service';

@Injectable({
  providedIn: 'root'
})
export class MessageService extends BaseService<Message> {

  constructor(http: HttpClient) {
    super(http);
    this.controllerPath = "message"
  }

  sendMessage(message: Message, senderId: number, receiverId: number): Observable<Message> {
    return this.http.post<Message>(this.baseUrl + this.controllerPath, message, {
      params: {
        senderId : senderId.toString(),
        receiverId : receiverId.toString(),
      }
    })
  }

  getAllMessagesInConversationByUsers(senderId: number, receiverId: number): Observable<Message[]> {
    return this.http.get<Message[]>(this.baseUrl + this.controllerPath, {
      params: {
        senderId : senderId.toString(),
        receiverId : receiverId.toString(),
      }
    })
  }

}
