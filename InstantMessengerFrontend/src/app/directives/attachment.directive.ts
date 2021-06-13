
import { ElementRef, HostListener, Input } from '@angular/core';
import { Directive } from '@angular/core';
import { saveAs } from 'file-saver';
import { AttachmentService } from '../services/fetch/attachment.service';

@Directive({
  selector: '[attachment]'
})
export class AttachmentDirective {
  @Input() attachedFile: any;
  @Input() preventDownload: boolean;

  highlightColor = 'darkgrey';

  constructor(private el: ElementRef, private attachmentService: AttachmentService) {}

  @HostListener('mouseenter') onMouseEnter() {
    this.highlight(this.highlightColor);
  }
  
  @HostListener('mouseleave') onMouseLeave() {
    this.highlight(null);
  }

  @HostListener('click') onCick() {
    this.downloadFile();
  }
  
  private highlight(color: string) {
    this.el.nativeElement.style.backgroundColor = color;
  }

  private downloadFile() {
    if(!this.preventDownload) {
      this.attachmentService.getAttachment(this.attachedFile.id).subscribe(res => {
        let blob:any = new Blob([res], { type: 'text/json; charset=utf-8' });
			  saveAs(blob, this.attachedFile.name);
      });
    }     
  }
}
