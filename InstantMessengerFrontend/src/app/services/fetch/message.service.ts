import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Message } from 'src/app/models/fetch/message';
import { BaseService } from './base.service';

@Injectable({
  providedIn: 'root'
})
export class MessageService extends BaseService<Message> {

  constructor(http: HttpClient) {
    super(http);
    this.controllerPath = "message"
  }

  sendMessage(formData: FormData): Observable<Message> {
    return this.http.post<Message>(this.baseUrl + this.controllerPath, formData, { 
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
