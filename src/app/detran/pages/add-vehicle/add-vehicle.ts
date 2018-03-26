import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FormBase } from '@espm/core';
import { IonicPage, ViewController } from 'ionic-angular';

import { Vehicle } from './../../model';

@IonicPage()
@Component({
  selector: 'page-add-vehicle',
  templateUrl: 'add-vehicle.html'
})
export class AddVehiclePage extends FormBase {
  validationMessages = {
    plate: {
      required: 'Obrigatório'
    },
    renavam: {
      required: 'Obrigatório',
      integer: 'Somente números'
    }
  };

  /**
   * Creates an instance of AddDriverLicensePage
   */
  constructor(formBuilder: FormBuilder, private viewCtrl: ViewController) {
    super(formBuilder);
  }

  /**
   *
   */
  createFormModel(): FormGroup {
    const form = this.formBuilder.group({
      plate: ['', [Validators.required, this.validators.plate]],
      renavam: ['', [Validators.required, this.validators.integer]]
    });

    this.onSubmit.subscribe(cnh => this.dismiss(cnh));

    return form;
  }

  /**
   *
   *
   */
  dismiss = (vehicle: Partial<Vehicle>) => this.viewCtrl.dismiss(vehicle);
}
