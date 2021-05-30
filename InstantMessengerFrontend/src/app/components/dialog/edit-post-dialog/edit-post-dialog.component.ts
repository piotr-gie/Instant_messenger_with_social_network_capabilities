import { Component, Inject, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Post } from 'src/app/models/fetch/post';

@Component({
  selector: 'app-edit-post-dialog',
  templateUrl: './edit-post-dialog.component.html',
  styleUrls: ['./edit-post-dialog.component.scss']
})
export class EditPostDialogComponent implements OnInit {
  model: Post;

  uploadedFiles: any [] = [];


  constructor(@Inject(MAT_DIALOG_DATA) data: Post ) {
    
  }
  ngOnInit(): void {
 
  }

  sendPost(post: Post) {
    this.model = post; 
    console.log(this.model);
  }

}
