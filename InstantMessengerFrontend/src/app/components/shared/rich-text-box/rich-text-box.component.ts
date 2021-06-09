import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { TextBoxType } from 'src/app/enums/message-box-type.enum';
import { Message } from 'src/app/models/fetch/message';
import ImageCompress from 'quill-image-compress';
import * as Quill from "quill";

Quill.register('modules/imageCompress', ImageCompress);

@Component({
  selector: 'app-rich-text-box',
  templateUrl: './rich-text-box.component.html',
  styleUrls: ['./rich-text-box.component.scss']
})
export class RichTextBoxComponent implements OnInit {
  @ViewChild('editor') elementView: ElementRef;
  @Output() textBoxSubmitEmit: EventEmitter<Message> = new EventEmitter();

  @Input() content: string;
  @Input() isReadOnly: boolean;
  @Input() textBoxType: TextBoxType;
  @Input() uploadedFiles: File [] = [];

  @Input() height: number;
  @Input() maxWidth: number;
  @Input() minHeight: number;
  @Input() maxHeight: number;
  @Input() theme: string = 'bubble';

  editorForm: FormGroup;
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

  textBoxTypeEnum = TextBoxType;

  constructor() {
    this.textBoxType = this.textBoxTypeEnum.edit;
  }
    
  ngOnInit() { 
    this.initFormGroup();
    this.initEditorStyle();
    this.removeToolbarIfReadOnly();
  }

  onSubmit() {
    let content: string = (this.editorForm.get("editor").value)?.toString();
    const message: Message = {
      senderId : 1,
      date : null,
      content: (content) ? content : "",
      attachments: this.uploadedFiles
    }
    if (this.isEditorFormNotEmpty() || this.uploadedFiles.length > 0) {
      this.textBoxSubmitEmit.emit(message);
      this.cleanTextBoxData();
    }  
  
  }

  private removeToolbarIfReadOnly() {
    if(this.isReadOnly) {
      this.editorConfig = {
        toolbar:  false 
      }
    }
  }

  private initEditorStyle() {
    this.editorStyle = {
      maxWidth: this.maxWidth + 'px',
      maxHeight: this.maxHeight + 'px',
      height: (this.isEditMode()) ? this.height + 'px' : ''
    }
  }

  private initFormGroup() {
    this.editorForm = new FormGroup({
      'editor' : new FormControl(null)
    })

    if(this.content !== undefined) {
      this.editorForm.get("editor").setValue(this.content);
    }
  }

  private cleanTextBoxData() {
    this.uploadedFiles = [];
    this.editorForm.get("editor").setValue(null);
  }

  addFileToUpload(file: File) {
    if(this.uploadedFiles.length < 3) {
      this.uploadedFiles.push(file);
    } 
  }

  isEditorFormNotEmpty() {
    return (this.editorForm.get("editor").value !== null);
  }

  removeFile(file: File) {
    const index = this.uploadedFiles.indexOf(file);

    if (index >= 0) {
      this.uploadedFiles.splice(index, 1);
    }
  }

  isEditMode(): boolean {
    return this.textBoxType === this.textBoxTypeEnum.edit
  }

  adjustHeight() {
    if(!this.isEditorFormNotEmpty()) {
      this.editorStyle = {
        maxHeight: this.height
      }
    }
    
    if (this.isEditMode()) {
      const editorHeight = this.elementView.nativeElement.offsetHeight;
      if(editorHeight >= this.maxHeight) {
        this.editorStyle = {
          height: this.maxHeight + 'px'
        }
      }
      if (!this.isEditorFormNotEmpty() &&
        editorHeight !== this.minHeight) {
          this.editorStyle = {
            maxheight: this.minHeight + 'px'
        }
      }     
    }
  }
}

