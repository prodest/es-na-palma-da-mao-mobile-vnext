import { Component, ChangeDetectionStrategy, OnInit, ViewChild, ChangeDetectorRef } from '@angular/core';
import { NavController } from 'ionic-angular';
import { FormBase } from '@espm/core';
import { Destination } from '../../state';
import { WizardStep } from '../../providers';
import { IAddresseesStepOutput } from '../../interfaces';

@Component({
  selector: 'edocs-documents-to-send-addressees',
  templateUrl: './documents-to-send-addressees.component.html',
  changeDetection: ChangeDetectionStrategy.Default
})
export class DocumentsToSendAddresseesComponent extends WizardStep<{addressees: IAddresseesStepOutput}> implements OnInit {
  addIcon: string = 'md-add-circle';
  colorAddIcon: string = 'dark';
  addressees: Destination[] = [];

  @ViewChild('addresseesForm') protected form: FormBase;


  constructor(private navCtrl: NavController, private cdr: ChangeDetectorRef) {
    super();
  }

  ngOnInit(): void { }

  refresh(): void { }

  async addAddresses() {
    const addAddresseesPage: string = 'DocumentsToSendAddAddresseesPage';
    await this.navCtrl.push(addAddresseesPage, this.addressees)
    const activeController = this.navCtrl.getActive();
    activeController.willLeave.subscribe(
      // change variable to angular handle @Input on form
      () => {
        this.addressees = [...this.addressees]
        this.cdr.detectChanges();
      }
    );
  }
}
