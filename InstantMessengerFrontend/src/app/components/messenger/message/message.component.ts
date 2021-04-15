import { Component, Input, OnInit } from '@angular/core';
import { TextBoxType } from 'src/app/enums/message-box-type.enum';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.scss']
})
export class MessageComponent {
  @Input() content: string;
  @Input() uploadedFiles: any []
  @Input() textBoxType: TextBoxType;

  textBoxTypeEnum = TextBoxType;

}
