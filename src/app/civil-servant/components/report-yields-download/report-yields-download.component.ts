import { Component, Input, Output, EventEmitter } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { IPaystubYear, IReportYieldCompany } from '../../interfaces';

@Component({
  selector: 'report-yields-download',
  templateUrl: 'report-yields-download.component.html'
})
export class ReportYieldsDownloadComponent {

  @Input() years: IPaystubYear[] = [];
  @Output() onSelectYear: EventEmitter<IPaystubYear> = new EventEmitter();
  @Input() companies: IReportYieldCompany[] = [];
  @Output() onSelectCompany: EventEmitter<IReportYieldCompany> = new EventEmitter();
  @Input() numVinc: number;
  @Input() numFunc: number;
  @Input() orgao: string;

  constructor(public navCtrl: NavController, public navParams: NavParams) { }

  selectYear(year: IPaystubYear): void {
    this.onSelectYear.emit(year);
  }

  selectCompany(company: IReportYieldCompany): void {
    this.onSelectCompany.emit(company);
  }

}

