import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from 'src/app/models/fetch/user';
import { BaseService } from './base.service';

@Injectable({
  providedIn: 'root'
})
export class FriendshipService extends BaseService<User> {

  constructor(http: HttpClient) {
    super(http);
    this.controllerPath = "friends"
  }

  getAllFriends(userId: number): Observable<any[]> {
    return this.http.get<User[]>(this.baseUrl + this.controllerPath, {
      params: {
        id : userId.toString()
      }
    })
  }

  addFriendship(senderId: number, reciverId: number): Observable<any> {
    return this.http.post<any>(this.baseUrl + this.controllerPath, {}, {
      params: {
        id1 : senderId.toString(),
        id2 : reciverId.toString()
      }
    })
  } 

  acceptFriendship(senderId: number, reciverId: number): Observable<any> {
    return this.http.put<any>(this.baseUrl + this.controllerPath + "/accept", {}, {
      params: {
        id1 : senderId.toString(),
        id2 : reciverId.toString()
      }
    })
  } 

  deleteFriendship(senderId: number, reciverId: number): Observable<any> {
    return this.http.delete<any>(this.baseUrl + this.controllerPath, {
      params: {
        id1 : senderId.toString(),
        id2 : reciverId.toString()
      }
    })
  } 
}
