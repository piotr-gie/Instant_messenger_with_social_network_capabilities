import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Post } from '../models/post'
import { BaseService } from './base.service';

@Injectable({
  providedIn: 'root'
})
export class BoardService extends BaseService<Post> {

  constructor(http: HttpClient) {
    super(http);
      this.controllerPath = "board"
   }
}
