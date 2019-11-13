import { Component, OnInit, OnChanges, SimpleChanges, ChangeDetectionStrategy, ChangeDetectorRef, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FormBase } from '@espm/core';

@Component({
  selector: 'civil-servant-paycheck-sheet-form',
  templateUrl: './paycheck-sheet-form.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PaycheckSheetFormComponent extends FormBase implements OnInit, OnChanges {

  @Input() years: string[] = ['2018', '2019'];
  @Input() months: string[] = ['Outubro', 'Novembro'];
  @Input() sheets: number[] = [31, 32];

  validationMessages = {
    year: {
      required: 'Obrigatório'
    },
    month: {
      required: 'Obrigatório'
    },
    sheet: {
      required: 'Obrigatório'
    }
  };

  yearsOptions = {
    placeholder: 'Ano',
    title: 'Ano',
    subTitle: 'Selecione o ano referente ao contracheque que deseja consultar'
  };

  monthsOptions = {
    title: 'Ano',
    subTitle: 'Selecione o mês referente ao contracheque que deseja consultar'
  };

  sheetsOptions = {
    title: 'Folha',
    subTitle: 'Selecione a folha referente ao contracheque que deseja consultar'
  };

  constructor(formBuilder: FormBuilder, private cdr: ChangeDetectorRef) {
    super(formBuilder);
  }

  ngOnInit(): void { }

  ngOnChanges(changes: SimpleChanges): void { }

  selectChange = () => {
    this.cdr.detectChanges();
  }

  protected createFormModel(): FormGroup {
    return this.formBuilder.group({
      year: ['', [Validators.required]],
      month: ['', [Validators.required]],
      sheet: ['', [Validators.required]]
    });
  }

}
