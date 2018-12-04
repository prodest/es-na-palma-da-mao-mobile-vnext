import { Component, OnDestroy } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { interval } from 'rxjs/observable/interval';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs/Subject';

import { BusLine, BusLineDetails } from './../../model';
import { BusLinesService } from './../../providers';

@IonicPage({
  segment: 'ceturb/linha/:lineNumber'
})
@Component({
  selector: 'page-bus-line-info',
  templateUrl: 'bus-line-info.html'
})
export class BusLineInfoPage implements OnDestroy {
  private destroyed$ = new Subject();
  line: BusLine;
  details: BusLineDetails;
  currentHour: string;
  tab: 'info' | 'directions' = 'info';

  /**
   *
   */
  constructor(private ceturb: BusLinesService, private navCtrl: NavController, private params: NavParams) {}

  /**
   * ref: https://github.com/ionic-team/ionic/issues/11459#issuecomment-365224107
   *
   */
  ionViewCanEnter(): boolean | Promise<any> {
    const isAllowed = !!this.params.get('lineNumber');

    if (!isAllowed) {
      setTimeout(() => this.navCtrl.push('BusLinesPage'));
    }
    return isAllowed;
  }

  /**
   *
   */
  ionViewDidLoad() {
    const lineNumber = this.params.get('lineNumber');
    this.ceturb
      .line$(lineNumber)
      .pipe(takeUntil(this.destroyed$))
      .subscribe((line: BusLine) => {
        this.line = line;
      });

    this.ceturb.loadLineDetails(lineNumber).subscribe();

    this.updateCurrentHour();

    interval(60 * 1000)
      .pipe(takeUntil(this.destroyed$))
      .subscribe(this.updateCurrentHour);
  }

  /**
   *
   *
   */
  ngOnDestroy() {
    this.destroyed$.next();
    this.destroyed$.unsubscribe();
  }

  /**
   *
   *
   */
  toggleFavorite = (busLine: BusLine) => {
    this.ceturb.toggleFavorite(busLine);
  };

  /**
   *
   *
   */
  private updateCurrentHour = () => (this.currentHour = new Date().toTimeString().slice(0, 5));
}
