import { Component, OnInit, OnDestroy } from '@angular/core';
import { IonicPage, App, NavController, NavParams } from 'ionic-angular';
import { Subject } from 'rxjs/Subject';
import { AuthQuery } from '@espm/core';
import { tap, takeUntil } from 'rxjs/operators';
import { AuthNeededService } from '@espm/core/auth/auth-needed.service';

type Favorite = {
  title: string;
  icon: string;
  component: string;
  isChecked: boolean;
  secure?: boolean;
  url?: string;
  name?: string;
  deepLink?: boolean;
  package?: string;
  uriScheme?: string;
}

@IonicPage()
@Component({
  selector: 'page-page-visitors',
  templateUrl: 'page-visitors.html',
})
export class PageVisitorsPage implements OnInit, OnDestroy {

  
  private serviceSelects:Array<Favorite>;
  private slides: Array<Favorite[]> = [];
  private isLoggedIn: boolean;
  private destroyed$ = new Subject<boolean>();

  constructor(
    private appCtrl: App,
    private navCtrl: NavController,
    private authQuery: AuthQuery, 
    private authNeeded: AuthNeededService,
    private navParams: NavParams) {
      
      this.serviceSelects = this.navParams.data;
      
      this.serviceSelects.map((elemento: Favorite, index: number) => {
        if (index%4 === 0) {
          this.slides.push([])
        }
        this.slides[this.slides.length-1].push(elemento);
      });
  }
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
    this.destroyed$.complete();
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
  goSelect(){
    this.navCtrl.push('SelectFavoritePage')
  }
}