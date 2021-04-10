import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-file-uploader',
  templateUrl: './file-uploader.component.html',
  styleUrls: ['./file-uploader.component.scss']
})
export class FileUploaderComponent implements OnInit {
  
  selectedFiles: File [] = [];

  constructor(private http: HttpClient) {}

  ngOnInit() {

  }

  onFileSelected(event) {
    this.selectedFiles.push(event.target.files[0]);     
  }

  onUpload() {
    this.selectedFiles.forEach((file) => {
      if (file) {

        const formData = new FormData();
        formData.append("thumbnail", file);
        const upload$ = this.http.post("/api/thumbnail-upload", formData);
        upload$.subscribe();
      }
    })     
  }
}

