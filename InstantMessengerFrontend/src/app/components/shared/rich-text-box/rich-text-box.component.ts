import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { TextBoxType } from 'src/app/enums/message-box-type.enum';
import { Message } from 'src/app/helpers/message';

@Component({
  selector: 'app-rich-text-box',
  templateUrl: './rich-text-box.component.html',
  styleUrls: ['./rich-text-box.component.scss']
})
export class RichTextBoxComponent implements OnInit {
  @Output() textBoxSubmitEmit: EventEmitter<Message> = new EventEmitter();

  @Input() content: string;
  @Input() isReadOnly: boolean;
  @Input() textBoxType: TextBoxType;
  @Input() uploadedFiles: File [] = [];

  @Input() maxWidth: number;
  @Input() maxHeight: number;

  editorForm: FormGroup;
  editorStyle: any;
  editorConfig: any;

  textBoxTypeEnum = TextBoxType;

  constructor() {
    this.textBoxType = this.textBoxTypeEnum.edit;
  }
    
  ngOnInit() { 
    this.initFormGroup();
    this.initEditorConfig();
    this.initEditorStyle();
  }

  onSubmit() {
    const message: Message = {
      content: (this.editorForm.get("editor").value)?.toString(),
      files: this.uploadedFiles
    }
    console.log(message.content)
    console.log(this.uploadedFiles.length)
    if (this.isEditorFormNotEmpty() || this.uploadedFiles.length > 0) {
      this.textBoxSubmitEmit.emit(message);
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
  }

  private initEditorStyle() {
    this.editorStyle = {
      maxWidth: this.maxWidth + 'px',
      maxHeight: this.maxHeight + 'px'
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
}

