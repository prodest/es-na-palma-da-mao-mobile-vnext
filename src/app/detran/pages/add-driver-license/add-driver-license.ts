import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FormBase } from '@espm/core';
import { IonicPage, NavParams, ViewController } from 'ionic-angular';

import { DriverLicense } from '../../model';

@IonicPage()
@Component({
  selector: 'page-add-driver-license',
  templateUrl: 'add-driver-license.html'
})
export class AddDriverLicensePage extends FormBase implements OnInit {
  submit$;
  cnh: DriverLicense;
  validationMessages = {
    registerNumber: {
      required: 'Obrigatório',
      integer: 'Somente números'
    },
    ballot: {
      required: 'Obrigatório',
      integer: 'Somente números'
    }
  };

  /**
   * Creates an instance of AddDriverLicensePage
   */
  constructor(formBuilder: FormBuilder, private viewCtrl: ViewController, private params: NavParams) {
    super(formBuilder);
    this.cnh = this.params.get('cnh');
  }

  /**
   *
   *
   */
  ngOnInit() {
    if (this.cnh) {
      this.form.reset(this.cnh);
    }
  }

  /**
   *
   */
  createFormModel(): FormGroup {
    const form = this.formBuilder.group({
      registerNumber: ['', [Validators.required, this.validators.integer]],
      ballot: ['', [Validators.required, this.validators.integer]]
    });

    this.onSubmit.subscribe(cnh => this.dismiss(cnh));

    return form;
  }

  /**
   *
   *
   */
  dismiss = (cnh?: any) => this.viewCtrl.dismiss(cnh);
}
