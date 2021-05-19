import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { BaseModel } from '../../models/baseModel';

@Injectable({
  providedIn: 'root'
})
export class BaseService<T extends BaseModel> {
  baseUrl = environment.apiUrl;
  controllerPath: string;

  constructor(protected http: HttpClient) { }

  getModels(): Observable<T[]>{
    return this.http.get<T[]>(this.baseUrl + this.controllerPath)
  }

  getModel(id: number): Observable<T>{
    return this.http.get<T>(this.baseUrl + this.controllerPath + '/' + id)
  }

  postModel(model: T): Observable<T>{
    return this.http.post<T>(this.baseUrl + this.controllerPath, model)
  }

  updateModel(model: T): Observable<T>{
    return this.http.put<T>(this.baseUrl + this.controllerPath + '/' + model.id, model)
  }

  deleteModel(id: number): Observable<T>{
    return this.http.delete<T>(this.baseUrl + this.controllerPath + '/' + id)
  }
}
