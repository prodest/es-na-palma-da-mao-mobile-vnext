import { Component, OnInit, OnChanges, SimpleChanges, ChangeDetectionStrategy, ChangeDetectorRef, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FormBase } from '@espm/core';
import { IPaystubYear, IPaystubMonth, IPaystubPayroll } from '../../interfaces';

@Component({
  selector: 'civil-servant-paycheck-payroll-form',
  templateUrl: './paycheck-payroll-form.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PaycheckPayrollFormComponent extends FormBase implements OnInit, OnChanges {

  @Input() years: IPaystubYear[] = [];
  @Output() onSelectYear: EventEmitter<IPaystubYear> = new EventEmitter();
  @Input() months: IPaystubMonth[] = [];
  @Output() onSelectMonth: EventEmitter<IPaystubMonth> = new EventEmitter();
  @Input() payrolls: IPaystubPayroll[] = [];
  @Output() onSelectPayroll: EventEmitter<IPaystubPayroll> = new EventEmitter();

  validationMessages = {
    year: {
      required: 'Obrigatório'
    },
    month: {
      required: 'Obrigatório'
    },
    payroll: {
      required: 'Obrigatório'
    }
  };

  yearsOptions = {
    placeholder: 'Ano',
    title: 'Ano',
    subTitle: 'Selecione o ano referente ao contracheque que deseja consultar'
  };

  monthsOptions = {
    title: 'Mês',
    subTitle: 'Selecione o mês referente ao contracheque que deseja consultar'
  };

  payrollsOptions = {
    title: 'Folha',
    subTitle: 'Selecione a folha referente ao contracheque que deseja consultar'
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
    if ('months' in changes) {
      const months: Array<IPaystubMonth> = changes['months'].currentValue || [];
      this.months = months.sort(sortDescNumber)
    }
  }

  selectYear(year: IPaystubYear): void {
    this.onSelectYear.emit(year);
    return this.selectChange();
  }

  selectMonth(month: IPaystubMonth): void {
    this.onSelectMonth.emit(month);
    return this.selectChange();
  }

  selectPayroll(payroll: IPaystubPayroll): void {
    this.onSelectPayroll.emit(payroll);
    return this.selectChange();
  }

  selectChange = () => {
    this.cdr.detectChanges();
  }

  protected createFormModel(): FormGroup {
    return this.formBuilder.group({
      year: [null, [Validators.required]],
      month: [null, [Validators.required]],
      payroll: [null, [Validators.required]]
    });
  }

}
