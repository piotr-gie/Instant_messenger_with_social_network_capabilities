import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-file-uploader',
  templateUrl: './file-uploader.component.html',
  styleUrls: ['./file-uploader.component.scss']
})
export class FileUploaderComponent {
  @Output() fileSelectedEmit: EventEmitter<File> = new EventEmitter();

  onFileSelected(event) {
    this.fileSelectedEmit.emit(event.target.files[0]);   
  }
}

