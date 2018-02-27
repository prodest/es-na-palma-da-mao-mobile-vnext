import { Component } from '@angular/core'
import { IonicPage, LoadingController, ModalController } from 'ionic-angular'
import { finalize } from 'rxjs/operators'

import { DriverLicense } from './../../model'
import { DetranService } from './../../providers'

@IonicPage()
@Component( {
    selector: 'page-driver-license',
    templateUrl: 'driver-license.html'
} )
export class DriverLicensePage {
    /**
     *
     *
     */
    constructor (
        private detranService: DetranService,
        private loadingCtrl: LoadingController,
        private modalCtrl: ModalController
    ) { }

    /**
     *
     *
     */
    addDriverLicense = () => {
        let modal = this.modalCtrl.create( 'AddDriverLicensePage', null, {
            cssClass: 'pop-up-modal',
            enableBackdropDismiss: true
        } )
        modal.onDidDismiss( this.saveCNH )
        modal.present()
    }

    /**
     *
     *
     */
    saveCNH = ( cnh: DriverLicense ) => {
        const loading = this.loadingCtrl.create( { content: 'Aguarde', enableBackdropDismiss: false } )
        this.detranService
            .saveCNH( cnh )
            .pipe( finalize(() => loading.dismiss() ) )
            .subscribe( CNH => console.log( 'adicionou: ', CNH ) )
    }
}
