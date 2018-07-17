import { Component, OnDestroy } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';
import deburr from 'lodash-es/deburr';
import { takeUntil, tap } from 'rxjs/operators';
import { Subject } from 'rxjs/Subject';

import { BusLine } from './../../model';
import { BusLinesService } from './../../providers';

@IonicPage({
  segment: 'ceturb/linhas'
})
@Component({
  selector: 'page-bus-lines',
  templateUrl: 'bus-lines.html'
})
export class BusLinesPage implements OnDestroy {
  allLines: BusLine[];
  filteredLines: BusLine[];
  private destroyed$ = new Subject();

  /**
   *
   *
   */
  constructor(private ceturb: BusLinesService, private navCtrl: NavController) {}

  /**
   *
   *
   */
  ionViewWillLoad() {
    this.ceturb.lines$
      .pipe(
        takeUntil(this.destroyed$),
        tap(allLines => {
          this.allLines = this.filteredLines = allLines || [];
        })
      )
      .subscribe();

    this.ceturb.loadAll();
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
  trackByNumber = (index: number, line: BusLine) => line.number;

  /**
   *
   *
   */
  search = e => {
    const search = this.normalize(e.target.value);
    this.filteredLines = this.allLines.filter(line => {
      return this.normalize(line.name).includes(search) || this.normalize(line.number).includes(search);
    });
  };

  /**
   *
   *
   */
  clear = () => {
    this.filteredLines = this.allLines;
  };

  /**
   *
   *
   */
  showDetails = (busLine: BusLine) => this.navCtrl.push('BusLineInfoPage', { lineNumber: busLine.number });

  /**
   *
   *
   */
  private normalize = (term: string) => (term ? deburr(term.toLowerCase()) : '');
}
