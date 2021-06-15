import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Post } from 'src/app/models/fetch/post';
import ImageCompress from 'quill-image-compress';
import * as Quill from "quill";
import { BehaviorSubject } from 'rxjs';

Quill.register('modules/imageCompress', ImageCompress);


@Component({
  selector: 'app-rich-post',
  templateUrl: './rich-post.component.html',
  styleUrls: ['./rich-post.component.scss']
})
export class RichPostComponent implements OnInit {
  @Output() postSubmitEmit: EventEmitter<Post> = new EventEmitter();
  
  @Input() post: Post;
  @Input() isReadOnly: BehaviorSubject<boolean>;

  postForm: FormGroup;
  uploadedFiles: any [] = [];

  editorStyle: any;

  editorConfig: any = {
    imageCompress: {
      quality: 0.5, 
      maxWidth: 600, 
      maxHeight: 600, 
      imageType: 'image/jpeg', 
    },
    toolbar: [
      ['bold', 'italic', 'underline', 'strike',
        { 'size': [] }, { 'color': [] }, { 'background': [] },
        { 'list': 'ordered' }, { 'list': 'bullet'},
        'image', 'clean'],
    ],   
  }

  constructor() { }

  ngOnInit() {
    this.initEditorConfig();
    this.initFormGroup();
    this.removeToolbarIfReadOnly();
  }

  onSubmit() {
    const post: Post = {
      id : this.post?.id,
      senderId : this.post?.senderId,
      content: (this.postForm.get("editor").value)?.toString(),
      date : this.post?.date,
      comments : this.post?.comments,
      files : this.post?.files
    }
    if (this.isEditorFormNotEmpty() || this.uploadedFiles.length > 0) {
      this.postSubmitEmit.emit(post);
      
      this.cleanTextBoxData();
    }  
  }

  private initEditorConfig() {
    this.editorStyle = {
      minHeight: '300px',
      border: 'none',
      backgroundColor: '#f5f5f5e3'
    }
  }

  private removeToolbarIfReadOnly() {
    if(this.isReadOnly) {
      this.editorConfig = {
        toolbar:  false 
      }
    }
  }

  private initFormGroup() {
    this.postForm = new FormGroup({
      'editor' : new FormControl(null)
    })

    if(this.post?.content !== undefined) {
      this.postForm.get("editor").setValue(this.post?.content);
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
