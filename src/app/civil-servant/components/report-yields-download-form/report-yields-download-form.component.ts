import { Component, OnInit, OnChanges, SimpleChanges, ChangeDetectionStrategy, ChangeDetectorRef, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FormBase } from '@espm/core';
import { IPaystubYear, IReportYieldCompany } from '../../interfaces';

@Component({
  selector: 'civil-servant-report-yields-download-form',
  templateUrl: './report-yields-download-form.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ReportYieldsDownloadFormComponent extends FormBase implements OnInit, OnChanges {

  @Input() years: IPaystubYear[] = [];
  @Output() onSelectYear: EventEmitter<IPaystubYear> = new EventEmitter();
  @Input() companies: IReportYieldCompany[] = [];
  @Output() onSelectCompany: EventEmitter<IReportYieldCompany> = new EventEmitter();

  validationMessages = {
    year: {
      required: 'Obrigatório'
    },
    companies: {
      required: 'Obrigatório'
    }
  };

  yearsOptions = {
    placeholder: 'Ano',
    title: 'Ano',
    subTitle: 'Selecione o ano referente ao informe que deseja consultar'
  };

  companiesOptions = {
    title: 'Empresa',
    subTitle: 'Selecione a empresa referente ao informe que deseja consultar'
  };

  monthsValues = ['', 'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro']

  constructor(formBuilder: FormBuilder, private cdr: ChangeDetectorRef) {
    super(formBuilder);
  }

  ngOnInit(): void { }

  ngOnChanges(changes: SimpleChanges): void {
    const sortDescNumber = (a: number, b: number) => {
      return a > b ? -1 : b > a ? 1 : 0;
    }
    if ('years' in changes) {
      const years: Array<IPaystubYear> = changes['years'].currentValue || [];
      this.years = years.sort(sortDescNumber)
    }
  }

  selectYear(year: IPaystubYear): void {
    if (typeof year !== 'number') { return; }
    this.onSelectYear.emit(year);
    this.resetCompany();
    return this.selectChange();
  }

  selectCompany(company: IReportYieldCompany): void {
    console.log('Empresa ',company)
    if (typeof company !== 'number') { return; }
    this.onSelectCompany.emit(company);
    return this.selectChange();
  }

  selectChange = () => {
    this.cdr.detectChanges();
  }

  private resetCompany(): void {
    this.form.get('company').setValue(null);
  }

  protected createFormModel(): FormGroup {
    return this.formBuilder.group({
      year: [null, [Validators.required]],
      company: [null, [Validators.required]]
    });
  }

}
