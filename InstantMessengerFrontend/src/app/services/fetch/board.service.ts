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

   getBoardByUserId(userId: number): Observable<Board> {
    return this.http.get<Board>(this.baseUrl + this.controllerPath, {
      params: {
        userId : userId.toString(),
      }
    })
  }

   addPost(content: string, userId: number): Observable<any> {
    let formData = new FormData();
    formData.append('content', content);
    formData.append('userId', userId.toString());
    return this.http.post<any>(this.baseUrl + this.controllerPath, formData);
  }

  editPost(post: Post): Observable<Post> {
    return this.http.put<Post>(this.baseUrl + this.controllerPath, post)
  }

  deletePostById(postId: number): Observable<Post> {
    return this.http.delete<Post>(this.baseUrl + this.controllerPath, {
      params: {
        postId : postId.toString()
      }
    })
  }

  addComment(content: string, postId: number, senderId: number): Observable<Post> {
    let formData = new FormData();
    formData.append('content', content);
    formData.append('postId', postId.toString());
    formData.append('senderId', senderId.toString());
    return this.http.post<Post>(this.baseUrl + this.controllerPath + '/' + postId, formData);
  }

  getComment(postId: number): Observable<Post> {
    return this.http.get<Post>(this.baseUrl + this.controllerPath + '/' + postId, {
      params : {
        postId : postId.toString()
      }
    });
  }

  editComment(comment: Post): Observable<Post> {
    return this.http.post<Post>(this.baseUrl + this.controllerPath + '/updateComment', comment);
  }

  deleteComment(commentId: number): Observable<Post> {
    return this.http.delete<Post>(this.baseUrl + this.controllerPath + '/' + commentId)
  }
}
