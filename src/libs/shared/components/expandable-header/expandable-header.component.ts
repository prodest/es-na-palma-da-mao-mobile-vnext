import { Component, ElementRef, Input, NgZone, OnDestroy, OnInit, Renderer } from '@angular/core';
import { Content } from 'ionic-angular';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs/Subject';

@Component({
  selector: 'expandable-header',
  templateUrl: './expandable-header.component.html'
})
export class ExpandableHeaderComponent implements OnInit, OnDestroy {
  private destroyed$ = new Subject<boolean>();
  @Input('scrollArea') scrollArea: Content;
  @Input('maxHeight') maxHeight: number;
  newHeaderHeight: any;

  get height(): number {
    return this.element.nativeElement.offsetHeight;
  }

  /**
   *
   *
   */
  constructor(private element: ElementRef, private renderer: Renderer, public zone: NgZone) {}

  /**
   *
   *
   */
  ngOnInit() {
    this.renderer.setElementStyle(this.element.nativeElement, 'height', `${this.maxHeight}px`);
    this.scrollArea.ionScroll.pipe(takeUntil(this.destroyed$)).subscribe(this.resizeHeader);
    this.scrollArea.ionScrollEnd.pipe(takeUntil(this.destroyed$)).subscribe(() => {
      if (this.newHeaderHeight === 0 || this.newHeaderHeight >= this.maxHeight) {
        this.scrollArea.resize();
      }
    });
  }

  /**
   *
   *
   */
  ngOnDestroy() {
    this.destroyed$.next(true);
    this.destroyed$.complete();
  }

  /**
   *
   *
   */
  private resizeHeader = ev => {
    // console.log(ev);
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
