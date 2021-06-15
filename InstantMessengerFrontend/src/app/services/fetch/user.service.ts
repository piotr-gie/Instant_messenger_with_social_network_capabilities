import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from 'src/app/models/fetch/user';
import { BaseService } from './base.service';

@Injectable({
  providedIn: 'root'
})
export class UserService extends BaseService<User> {

  constructor(http: HttpClient) {
      super(http);
      this.controllerPath = "user"
  }

  setImage(id: number, image: any): Observable<User> {
    let formData = new FormData();
    formData.append('image', image);
    return this.http.put<User>(this.baseUrl + this.controllerPath + '/' + id, formData)
  }

}
