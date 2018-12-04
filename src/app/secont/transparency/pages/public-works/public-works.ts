import { Component, OnInit } from '@angular/core';
import { IonicPage, LoadingController, ModalController } from 'ionic-angular';
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators';

import { ChartModel, PublicWorks, PublicWorksItem, TransparencyPage, YearFilter } from '../../model';
import { TransparencyApiService } from './../../providers';

@IonicPage({
  segment: 'secont/obras-publicas',
  name: 'TransparenciaPublicWorksPage'
})
@Component({
  selector: 'page-transparencia-public-works',
  templateUrl: 'public-works.html'
})
export class PublicWorksPage extends TransparencyPage<YearFilter, PublicWorks> implements OnInit {
  /**
   *
   */
  constructor(private api: TransparencyApiService, private modalCtrl: ModalController, loadingCtrl: LoadingController) {
    super(loadingCtrl);
  }

  /**
   *
   */
  ngOnInit() {
    this.doFilter({ filter: YearFilter.currentYear() }).subscribe();
  }

  openFilter() {
    let filterModal = this.modalCtrl.create('TransparencyFilterPage', {
      title: 'Obras Públicas',
      year: true,
      filter: this.filter
    });
    filterModal.onDidDismiss((filter: YearFilter) => {
      if (filter) {
        this.doFilter({ filter: filter }).subscribe();
      }
    });
    filterModal.present();
  }

  /**
   *
   */
  protected getData({ filter }): Observable<PublicWorks> {
    return this.api.getPublicWorksByCities(filter).pipe(map(this.formatItems));
  }

  /**
   *
   */
  protected createChartModel(items: PublicWorksItem[]): ChartModel {
    return {
      labels: items.map(item => item.label),
      values: items.map(item => item.percentage),
      colors: [{ backgroundColor: items.map(item => item.color) }]
    };
  }

  /**
   *
   *
   */
  private formatItems = (publicWorks: PublicWorks): PublicWorks => {
    return {
      ...publicWorks,
      ...{
        items: publicWorks.items.map(item => Object.assign(item, { label: `${item.label} (${item.quantity || 0} obras)` }))
      }
    };
  };
}
