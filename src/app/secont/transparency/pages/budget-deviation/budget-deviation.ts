import { Component, OnInit } from '@angular/core';
import { IonicPage, LoadingController, ModalController } from 'ionic-angular';
import { Observable } from 'rxjs/Observable';

import { BudgetDeviation, BudgetDeviationItem, ChartModel, TransparencyPage, YearFilter } from '../../model';
import { TransparencyApiService } from './../../providers';

@IonicPage({
  segment: 'secont/orcado-executado',
  name: 'TransparenciaOrcadoxExecutadoPage'
})
@Component({
  selector: 'page-transparencia-budget-deviation',
  templateUrl: 'budget-deviation.html'
})
export class BudgetDeviationPage extends TransparencyPage<YearFilter, BudgetDeviation> implements OnInit {
  private chartColors = {
    red: 'rgb(255, 99, 132)',
    blue: 'rgb(54, 162, 235)'
  };

  budgetDeviationDatasets;

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
    this.doFilter({ filter: YearFilter.currentYear() }).subscribe(this.setChartDataset);
  }

  openFilter() {
    let filterModal = this.modalCtrl.create('TransparencyFilterPage', {
      title: 'Orçado X Executado',
      year: true,
      filter: this.filter
    });
    filterModal.onDidDismiss((filter: YearFilter) => {
      if (filter) {
        this.doFilter({ filter: filter }).subscribe(this.setChartDataset);
      }
    });
    filterModal.present();
  }

  /**
   *
   */
  protected getData({ filter }: { filter: YearFilter }): Observable<BudgetDeviation> {
    return this.api.getBudgetDeviation(filter);
  }

  /**
   *
   */
  protected createChartModel(items: BudgetDeviationItem[]): ChartModel {
    return null;
  }

  /**
   *
   */
  private setChartDataset = (data: any) => {
    if (data) {
      this.budgetDeviationDatasets = [
        this.getChartDatasetItem(data.percentage, 'Executado', this.chartColors.red),
        this.getChartDatasetItem(100, 'Orçado', this.chartColors.blue)
      ];
    } else {
      this.budgetDeviationDatasets = null;
    }
  };

  /**
   *
   */
  private getChartDatasetItem = (value: number, label: string, color: string) => {
    return {
      data: [value],
      label: label,
      borderColor: color,
      borderWidth: 1
    };
  };
}
