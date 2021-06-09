import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { BaseService } from './base.service';

@Injectable({
  providedIn: 'root'
})
export class AttachmentService extends BaseService<any> {

  constructor(http: HttpClient) {
    super(http);
      this.controllerPath = "attachment"
   }

    getAttachment(id: number): Observable<any> {
      return this.http.get(this.baseUrl + this.controllerPath + '/' + id, {responseType: 'blob'});
    }
}
