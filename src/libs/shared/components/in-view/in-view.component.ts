import { isPlatformBrowser } from '@angular/common';
import {
  ChangeDetectorRef,
  Component,
  ContentChild,
  ElementRef,
  EventEmitter,
  Inject,
  Input,
  OnDestroy,
  OnInit,
  Output,
  PLATFORM_ID,
  TemplateRef,
} from '@angular/core';

@Component({
  selector: 'in-view',
  template: `
    <ng-container *ngIf="inView" [ngTemplateOutlet]="template"> </ng-container>
  `,
  styles: [':host {display: block;}']
})
export class InViewComponent implements OnInit, OnDestroy {
  observer: IntersectionObserver;
  inView: boolean = false;
  once50PctVisible: boolean = false;

  @ContentChild(TemplateRef) template: TemplateRef<any>;
  @Input() options: any = { threshold: [0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8] };
  // tslint:disable-next-line:no-output-rename
  @Output('inView') inView$: EventEmitter<any> = new EventEmitter();
  // tslint:disable-next-line:no-output-rename
  @Output('notInView') notInView$: EventEmitter<any> = new EventEmitter();

  /**
   *
   *
   */
  constructor(private element: ElementRef, @Inject(PLATFORM_ID) private platformId: any, private cd: ChangeDetectorRef) {}

  /**
   *
   *
   */
  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.observer = new IntersectionObserver(this.handleIntersect, this.options);
      this.observer.observe(this.element.nativeElement);
    }
  }

  /**
   *
   *
   */
  ngOnDestroy(): void {
    this.observer.unobserve(this.element.nativeElement);
    this.observer.disconnect();
  }

  /**
   *
   *
   */
  handleIntersect = (entries, observer): void => {
    entries.forEach((entry: IntersectionObserverEntry) => {
      if (entry.isIntersecting) {
        this.inView = true;
        this.defaultInViewHandler(entry);
        this.inView$.emit(entry);
      } else {
        this.notInView$.emit(entry);
      }
    });
  };

  /**
   *
   *
   */
  defaultInViewHandler = entry => {
    if (this.once50PctVisible) return false;
    if (this.inView$.observers.length) return false;

    if (entry.intersectionRatio < 0.8) {
      let opacity = entry.intersectionRatio * (1 / 0.8);
      let blur = 20 - Math.floor(entry.intersectionRatio * 10) * 4;
      let filter = `blur(${blur}px)`;
      Object.assign(entry.target.style, { opacity, filter });
    } else {
      entry.target.style.opacity = 1;
      entry.target.style.filter = 'unset';

      this.once50PctVisible = true;
    }

    this.cd.detectChanges();
  };
}
