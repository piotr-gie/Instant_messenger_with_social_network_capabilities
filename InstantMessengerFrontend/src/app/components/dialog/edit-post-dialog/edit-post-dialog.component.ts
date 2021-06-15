import { Component, Inject, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Post } from 'src/app/models/fetch/post';
import { DialogWindowService } from 'src/app/services/functional/dialog-window.service';

@Component({
  selector: 'app-edit-post-dialog',
  templateUrl: './edit-post-dialog.component.html',
  styleUrls: ['./edit-post-dialog.component.scss']
})
export class EditPostDialogComponent implements OnInit {
  model: Post;

  uploadedFiles: any [] = [];


  constructor(@Inject(MAT_DIALOG_DATA) data: Post, private dialogService: DialogWindowService) {
    this.model = data;
  }
  
  ngOnInit(): void {
    
  }

  sendPost(post: Post) {
    this.dialogService.dialogRef.close(post);
  }
}
