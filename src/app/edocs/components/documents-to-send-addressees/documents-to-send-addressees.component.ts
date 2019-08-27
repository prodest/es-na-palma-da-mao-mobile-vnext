import { Component, ChangeDetectionStrategy, OnInit, ViewChild, ChangeDetectorRef } from '@angular/core';
import { /*NavController, Events,*/ ModalController, Modal } from 'ionic-angular';
import { FormBase } from '@espm/core';
import { Destination } from '../../state';
import { WizardStep } from '../../providers';
import { IAddresseesStepOutput } from '../../interfaces';
// import { DocumentsToSendAddAddresseesComponent } from '../documents-to-send-add-addressees';

@Component({
  selector: 'edocs-documents-to-send-addressees',
  templateUrl: './documents-to-send-addressees.component.html',
  changeDetection: ChangeDetectionStrategy.Default
})
export class DocumentsToSendAddresseesComponent extends WizardStep<{ addressees: IAddresseesStepOutput }> implements OnInit {
  addIcon: string = 'md-add-circle';
  colorAddIcon: string = 'dark';
  addressees: Destination[] = [];

  @ViewChild('addresseesForm') protected form: FormBase;

  constructor(/*private navCtrl: NavController,*/ private cdr: ChangeDetectorRef, private modal: ModalController, /*private events: Events*/) {
    super();
  }

  ngOnInit(): void {
    // this.events.subscribe('documents-to-send-add-addressess:add', addressees => {
    //   this.addressees = [...this.addressees, addressees]
    //   this.cdr.detectChanges();
    // })
  }

  refresh(): void { }

  removeAddressee(index: number): void {
    this.addressees = [
      ...this.addressees.slice(0, index),
      ...this.addressees.slice(index + 1)
    ]
    this.cdr.detectChanges();
  }

  async addAddresses() {
    // const addAddresseesPage: string = 'DocumentsToSendAddAddresseesComponent';
    // await this.navCtrl.push(addAddresseesPage, this.addressees)

    const addAddresseesModal: Modal = this.modal.create('DocumentsToSendAddAddresseesComponent', this.addAddresses);

    addAddresseesModal.present();

    addAddresseesModal.onDidDismiss( addressees => {
      this.addressees = [...this.addressees, addressees];
    })
    this.cdr.detectChanges();
  }
}
