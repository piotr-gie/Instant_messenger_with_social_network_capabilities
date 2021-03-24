import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-rich-text-box',
  templateUrl: './rich-text-box.component.html',
  styleUrls: ['./rich-text-box.component.scss']
})
export class RichTextBoxComponent implements OnInit {
  @Output() textBoxValueEmit: EventEmitter<string> = new EventEmitter();

  @Input() maxWidth: number;
  @Input() maxHeight: number;
  @Input() isReadOnly: boolean;

  editorForm: FormGroup;
  editorStyle: any;
  editorConfig: any;
    
  ngOnInit() { 
    this.initFormGroup();
    this.initEditorConfig();
    this.initEditorStyle();
  }

  onSubmit() {
    const value = this.editorForm.get("editor").value;
    this.textBoxValueEmit.emit(value);
    console.log(value);
  }

  private initEditorConfig() {
    this.editorConfig = {
      toolbar: (this.isReadOnly) ? false : [
        ['bold', 'italic', 'underline', 'strike',
          { 'size': [] }, { 'color': [] }, { 'background': [] },
          { 'list': 'ordered' }, { 'list': 'bullet'},
          'link', 'image', 'clean'],
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
  }
}
