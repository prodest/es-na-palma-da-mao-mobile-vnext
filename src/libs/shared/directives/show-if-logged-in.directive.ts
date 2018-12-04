// import { Directive, Input, OnDestroy, OnInit, TemplateRef, ViewContainerRef } from '@angular/core'
// import { AuthStorage } from '@espm/core'
// import { Subject } from 'rxjs/Subject'

// @Directive({ selector: '[showIfLoggedIn]' })

// export class ShowIfLoggedInDirective implements OnInit, OnDestroy {
//   private destroyed$ = new Subject()
//   // tslint:disable-next-line:no-input-rename
//   @Input('showIfLoggedIn') renderTemplate;

//   /**
//    *
//    */
//   constructor(private authStorage: AuthStorage, private templateRef: TemplateRef<any>, private viewContainer: ViewContainerRef) { }
//   /**
//    *
//    */
//   ngOnInit() {
//     this.authStorage.all$.pipe(pluck('user')).subscribe(isLoggedIn => {
//       if (isLoggedIn) {
//         if (this.renderTemplate) {
//           this.viewContainer.createEmbeddedView(this.templateRef);
//         } else {
//           this.viewContainer.clear();
//         }
//       } else {
//         if (this.renderTemplate) {
//           this.viewContainer.clear();
//         } else {
//           this.viewContainer.createEmbeddedView(this.templateRef);
//         }
//       }
//     })
//   }

//   /**
//    *
//    */
//   ngOnDestroy() {

//   }
// }
