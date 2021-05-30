import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Post } from 'src/app/models/fetch/post';

@Component({
  selector: 'app-rich-post',
  templateUrl: './rich-post.component.html',
  styleUrls: ['./rich-post.component.scss']
})
export class RichPostComponent implements OnInit {
  @Output() postSubmitEmit: EventEmitter<Post> = new EventEmitter();
  
  @Input() content: string;
  @Input() isReadOnly: boolean;

  postForm: FormGroup;
  uploadedFiles: any [] = [];

  editorStyle: any;
  editorConfig: any;

  constructor() { }

  ngOnInit() {
    this.initEditorConfig();
    this.initFormGroup();
  }

  onSubmit() {
    const post: Post = {
      content: (this.postForm.get("editor").value)?.toString()
    }
    console.log(post);
    if (this.isEditorFormNotEmpty() || this.uploadedFiles.length > 0) {
      this.postSubmitEmit.emit(post);
      
      this.cleanTextBoxData();
    }  
  }

  private initEditorConfig() {
    this.editorConfig = {
      toolbar: (this.isReadOnly) ? false : [
        ['bold', 'italic', 'underline', 'strike',
          { 'size': [] }, { 'color': [] }, { 'background': [] },
          { 'list': 'ordered' }, { 'list': 'bullet'},
          'image', 'clean'],
      ],
    }
    this.editorStyle = {
      minHeight: '300px'
    }
  }

  private initFormGroup() {
    this.postForm = new FormGroup({
      'editor' : new FormControl(null)
    })

    if(this.content !== undefined) {
      this.postForm.get("editor").setValue(this.content);
    }
  }

  private cleanTextBoxData() {
    this.uploadedFiles = [];
    this.postForm.get("editor").setValue(null);
  }

  isEditorFormNotEmpty() {
    return (this.postForm.get("editor").value !== null);
  }

  removeFile(file: File) {
    const index = this.uploadedFiles.indexOf(file);

    if (index >= 0) {
      this.uploadedFiles.splice(index, 1);
    }
  }

  addFileToUpload(file: File) {
    if(this.uploadedFiles.length < 3) {
      this.uploadedFiles.push(file);
    } 
  }

}
