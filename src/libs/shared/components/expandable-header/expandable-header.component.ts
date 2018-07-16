import { Component, ElementRef, Input, OnInit, Renderer } from '@angular/core';

@Component({
  selector: 'expandable-header',
  templateUrl: './expandable-header.component.html'
})
export class ExpandableHeaderComponent implements OnInit {
  @Input('scrollArea') scrollArea: any;
  @Input('maxHeight') maxHeight: number;
  newHeaderHeight: any;

  get height(): number {
    return this.element.nativeElement.offsetHeight;
  }

  /**
   *
   *
   */
  constructor(private element: ElementRef, private renderer: Renderer) {}

  /**
   *
   *
   */
  ngOnInit() {
    this.renderer.setElementStyle(this.element.nativeElement, 'height', `${this.maxHeight}px`);
    this.scrollArea.ionScroll.subscribe(this.resizeHeader);
  }

  /**
   *
   *
   */
  private resizeHeader = ev => {
    ev &&
      ev.domWrite(() => {
        this.newHeaderHeight = this.maxHeight - ev.scrollTop;

        if (this.newHeaderHeight < 0) {
          this.newHeaderHeight = 0;
        }

        this.renderer.setElementStyle(this.element.nativeElement, 'height', `${this.newHeaderHeight}px`);

        for (const headerElement of this.element.nativeElement.children) {
          const totalHeight = headerElement.offsetTop + headerElement.clientHeight;
          if (totalHeight > this.newHeaderHeight && !headerElement.isHidden) {
            headerElement.isHidden = true;
            this.renderer.setElementStyle(headerElement, 'opacity', '0');
          } else if (totalHeight <= this.newHeaderHeight && headerElement.isHidden) {
            headerElement.isHidden = false;
            this.renderer.setElementStyle(headerElement, 'opacity', '1');
          }
        }
      });
  };
}
