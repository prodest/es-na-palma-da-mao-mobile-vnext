import { Component, ChangeDetectionStrategy, ViewChild, ChangeDetectorRef, Input } from '@angular/core';
import { ModalController, Modal } from 'ionic-angular';
import { FormBase } from '@espm/core';
import { Destination } from '../../state';
import { WizardStep } from '../../providers';
import { IAddresseesStepOutput } from '../../interfaces';

@Component({
  selector: 'edocs-documents-to-send-addressees',
  templateUrl: './documents-to-send-addressees.component.html',
  changeDetection: ChangeDetectionStrategy.Default
})
export class DocumentsToSendAddresseesComponent extends WizardStep<{ addressees: IAddresseesStepOutput }> {
  addIcon: string = 'md-add-circle';
  colorAddIcon: string = 'dark';
  addressees: Destination[] = [];

  @ViewChild('addresseesForm') protected form: FormBase;

  @Input() private agentePublico: boolean;

  constructor(private cdr: ChangeDetectorRef, private modal: ModalController) {
    super();
  }

  removeAddressee(index: number): void {
    this.addressees = [
      ...this.addressees.slice(0, index),
      ...this.addressees.slice(index + 1)
    ]
    this.cdr.detectChanges();
  }

  async addAddresses() {
    const addAddresseesModal: Modal = this.modal.create('DocumentsToSendAddAddresseesComponent', { agentePublico: this.agentePublico });

    addAddresseesModal.present();

    addAddresseesModal.onDidDismiss(addressees => {
      if (addressees && this.addressees.findIndex(ad => ad.id === addressees.id) === -1) {
        this.addressees = [...this.addressees, addressees];
      }
      this.cdr.detectChanges();
    })

  }
}
