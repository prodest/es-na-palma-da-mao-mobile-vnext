import { ChangeDetectorRef, Directive, Input, OnDestroy, OnInit, TemplateRef, ViewContainerRef } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

export class NgSubscribeContext {
  public $implicit: any = null;
  public ngSubscribe: any = null;
}

@Directive({
  selector: '[ngSubscribe]'
})
export class NgSubscribeDirective implements OnInit, OnDestroy {
  private observable: Observable<any>;
  private context: NgSubscribeContext = new NgSubscribeContext();
  private subscription: Subscription;

  @Input()
  set ngSubscribe(inputObservable: Observable<any>) {
    if (this.observable !== inputObservable) {
      this.observable = inputObservable;
      this.subscription && this.subscription.unsubscribe();
      this.subscription = this.observable.subscribe(value => {
        // this.context.$implicit = value;
        this.context.ngSubscribe = value;
        this.cdr.markForCheck();
      });
    }
  }

  /**
   *
   */
  constructor(
    private viewContainer: ViewContainerRef,
    private cdr: ChangeDetectorRef,
    private templateRef: TemplateRef<any>
  ) {}

  /**
   *
   */
  ngOnInit() {
    this.viewContainer.createEmbeddedView(this.templateRef, this.context);
  }

  /**
   *
   */
  ngOnDestroy(): void {
    this.subscription && this.subscription.unsubscribe();
  }
}
