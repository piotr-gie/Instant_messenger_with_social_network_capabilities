import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { BaseModel } from '../models/baseModel';

@Injectable({
  providedIn: 'root'
})
export class BaseService {
  baseUrl = environment.apiUrl;
  controllerPath: string;

  constructor(private http: HttpClient) { }

  getModels(): Observable<BaseModel[]>{
    return this.http.get<BaseModel[]>(this.baseUrl + this.controllerPath)
  }

  getModel(id: number): Observable<BaseModel>{
    return this.http.get<BaseModel>(this.baseUrl + this.controllerPath + '/' + id)
  }

  postModel(model: BaseModel): Observable<BaseModel>{
    return this.http.post<BaseModel>(this.baseUrl + this.controllerPath, model)
  }

  deleteModel(id: number): Observable<BaseModel>{
    return this.http.delete<BaseModel>(this.baseUrl + this.controllerPath + '/' + id)
  }
}
