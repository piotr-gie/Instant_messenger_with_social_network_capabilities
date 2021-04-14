import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DownloadFileService {

  constructor(private http: HttpClient) {}

  downloadFile(file: File) {
    this.http.get('endpoint/', {responseType: "blob"})
      .subscribe(blob => {
        saveAs(blob, file.name);
   });
  }


}
