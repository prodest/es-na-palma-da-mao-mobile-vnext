import { Component, OnInit, OnDestroy } from '@angular/core';
import { IonicPage, App } from 'ionic-angular';
import { Subject } from 'rxjs/Subject';
import { AuthQuery } from '@espm/core';
import { tap, takeUntil } from 'rxjs/operators';
import { AuthNeededService } from '@espm/core/auth/auth-needed.service';

@IonicPage()
@Component({
  selector: 'page-dashboard',
  templateUrl: 'dashboard.html'
})
export class DashboardPage implements OnInit, OnDestroy {
  isLoggedIn: boolean;
  private destroyed$ = new Subject<boolean>();

  constructor(private appCtrl: App, private authQuery: AuthQuery, private authNeeded: AuthNeededService) {}

  /**
   *
   */
  ngOnInit() {
    this.authQuery.isLoggedIn$
      .pipe(tap(() => takeUntil(this.destroyed$)))
      .subscribe(isLoggedIn => (this.isLoggedIn = isLoggedIn));
  }

  /**
   *
   */
  ngOnDestroy(): void {
    this.destroyed$.next(true);
    this.destroyed$.unsubscribe();
  }

  /*
   *
   */
  openPage = (page: string, accessDenied: boolean = false) => {
    if (accessDenied) {
      this.authNeeded.showAuthNeededModal();
    } else {
      this.appCtrl.getRootNav().push(page);
    }
  };
}
