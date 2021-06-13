import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { Board } from 'src/app/models/fetch/board';
import { Post } from '../../models/fetch/post'
import { BaseService } from './base.service';

@Injectable({
  providedIn: 'root'
})
export class BoardService extends BaseService<Post> {

  constructor(http: HttpClient) {
    super(http);
      this.controllerPath = "board"
   }

   addPost(content: string, userId: number): Observable<any> {
    let formData = new FormData();
    formData.append('content', content);
    formData.append('userId', userId.toString());
    return this.http.post<any>(this.baseUrl + this.controllerPath, formData);
  }

   getBoardByUserId(userId: number): Observable<Board> {
    return this.http.get<Board>(this.baseUrl + this.controllerPath, {
      params: {
        userId : userId.toString(),
      }
    })
  }

  deletePostById(postId: number): Observable<Post> {
    return this.http.delete<Post>(this.baseUrl + this.controllerPath, {
      params: {
        id : postId.toString()
      }
    })
  }
}
