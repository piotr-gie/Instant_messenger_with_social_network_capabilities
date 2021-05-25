import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from 'src/app/models/fetch/user';
import { Friendship } from 'src/app/models/helpers/friendship';
import { BaseService } from './base.service';

@Injectable({
  providedIn: 'root'
})
export class FriendshipService extends BaseService<User> {

  constructor(http: HttpClient) {
    super(http);
    this.controllerPath = "friends"
  }

  getAllFriends(userId: number): Observable<Friendship[]> {
    return this.http.get<Friendship[]>(this.baseUrl + this.controllerPath, {
      params: {
        id : userId.toString()
      }
    })
  }

  addFriendship(senderId: number, reciverId: number): Observable<Friendship> {
    return this.http.post<Friendship>(this.baseUrl + this.controllerPath, {}, {
      params: {
        id1 : senderId.toString(),
        id2 : reciverId.toString()
      }
    })
  } 

  acceptFriendship(senderId: number, reciverId: number): Observable<Friendship> {
    return this.http.put<Friendship>(this.baseUrl + this.controllerPath + "/accept", {}, {
      params: {
        id1 : senderId.toString(),
        id2 : reciverId.toString()
      }
    })
  } 

  deleteFriendship(senderId: number, reciverId: number): Observable<Friendship> {
    return this.http.delete<Friendship>(this.baseUrl + this.controllerPath, {
      params: {
        id1 : senderId.toString(),
        id2 : reciverId.toString()
      }
    })
  } 
}
