import { ElementRef, HostListener, Input } from '@angular/core';
import { Directive } from '@angular/core';
import { saveAs } from 'file-saver';

@Directive({
  selector: '[attachment]'
})
export class AttachmentDirective {
  @Input() attachedFile: File;
  @Input() preventDownload: boolean;

  highlightColor = 'darkgrey';

  constructor(private el: ElementRef) {}

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
      const fileToDowload = this.attachedFile;
      saveAs(new Blob([fileToDowload], {type: ''}), fileToDowload.name); 
    }     
  }
}
