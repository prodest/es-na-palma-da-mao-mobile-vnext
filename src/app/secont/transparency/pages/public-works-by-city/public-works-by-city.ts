import { Component, OnInit } from '@angular/core';
import { IonicPage, LoadingController, NavParams, ModalController } from 'ionic-angular';
import { Observable } from 'rxjs/Observable';

import { ChartModel, PublicWorksByCity, PublicWorksByCityItem, TransparencyPage, YearFilter } from '../../model';
import { TransparencyApiService } from './../../providers';

@IonicPage({
  segment: 'secont/obras-publicas-por-cidade',
  name: 'TransparenciaPublicWorksByCityPage'
})
@Component({
  selector: 'page-transparencia-public-works-by-city',
  templateUrl: 'public-works-by-city.html'
})
export class PublicWorksByCityPage extends TransparencyPage<YearFilter, PublicWorksByCity> implements OnInit {
  private cityId: string;

  /**
   *
   */
  constructor(
    private api: TransparencyApiService,
    private modalCtrl: ModalController,
    private params: NavParams,
    loadingCtrl: LoadingController
  ) {
    super(loadingCtrl);
  }

  /**
   *
   */
  ngOnInit() {
    const filter = this.params.get('filter') || YearFilter.currentYear();
    this.cityId = this.params.get('cityId');

    this.doFilter({ id: this.cityId, filter: filter }).subscribe();
  }

  openFilter() {
    let filterModal = this.modalCtrl.create('TransparencyFilterPage', {
      title: 'Obras Públicas',
      year: true,
      filter: this.filter
    });
    filterModal.onDidDismiss((filter: YearFilter) => {
      if (filter) {
        this.doFilter({ id: this.cityId, filter: filter }).subscribe();
      }
    });
    filterModal.present();
  }

  /**
   *
   */
  protected getData({ id, filter }): Observable<PublicWorksByCity> {
    return this.api.getPublicWorksByCity(id, filter);
  }

  /**
   *
   */
  protected createChartModel(items: PublicWorksByCityItem[]): ChartModel {
    return {
      labels: items.map(item => item.label),
      values: items.map(item => item.percentage),
      colors: [{ backgroundColor: items.map(item => item.color) }]
    };
  }
}
