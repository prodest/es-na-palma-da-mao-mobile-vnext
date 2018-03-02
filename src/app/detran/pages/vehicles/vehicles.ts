import { Component, OnDestroy } from '@angular/core'
import { AlertController, IonicPage, ModalController, NavController } from 'ionic-angular'
import { Observable } from 'rxjs/Observable'
import { Subject } from 'rxjs/Subject'

import { Vehicle } from './../../model'
import { VehiclesService } from './../../providers'

@IonicPage()
@Component( {
    selector: 'page-vehicles',
    templateUrl: 'vehicles.html'
} )
export class VehiclesPage implements OnDestroy {
    editing = false
    vehicles$: Observable<Vehicle[]>
    destroyed$ = new Subject()

    /**
     *
     *
     */
    constructor (
        private detran: VehiclesService,
        private navCtrl: NavController,
        private alertCtrl: AlertController,
        private modalCtrl: ModalController
    ) { }

    /**
     *
     *
     */
    ionViewWillLoad() {
        this.detran.ready.then( this.loadVehicles )
    }

    /**
     *
     *
     */
    ngOnDestroy() {
        this.destroyed$.next()
        this.destroyed$.unsubscribe()
    }

    /**
     *
     *
     */
    loadVehicles = () => {
        //  observa mundanças nos veículos
        this.vehicles$ = this.detran.vehicles$.takeUntil( this.destroyed$ ) // .subscribe(this.updateVehicles)

        // carregamento inicial
        this.detran.load().subscribe()
    }

    /**
     *
     *
     */
    addVehicle = () => {
        let modal = this.modalCtrl.create( 'AddVehiclePage', null, {
            cssClass: 'pop-up-modal',
            enableBackdropDismiss: true
        } )
        modal.onDidDismiss( this.saveVehicle )
        modal.present()
    }

    /**
     *
     *
     */
    confirmRemove = ( vehicle: Vehicle ) => {
        let alert = this.alertCtrl.create( {
            title: 'Remover veículo',
            message: `Deseja mesmo remover o veículo com placa ${ vehicle.plate.toUpperCase() }?`,
            buttons: [
                {
                    text: 'Cancelar',
                    role: 'cancel'
                },
                {
                    text: 'Remover',
                    handler: () => {
                        return this.removeVehicle( vehicle )
                    }
                }
            ]
        } )
        alert.present()
    }

    /**
     *
     *
     */
    saveVehicle = ( vehicle: Vehicle ) => {
        vehicle && this.detran.add( vehicle ).subscribe()
    }

    /**
     *
     *
     */
    showTickets = ( vehicle: Vehicle ) => {
        this.navCtrl.push( 'VehicleTicketsPage', { vehicle } )
    }

    /**
     *
     *
     */
    toggleEditMode = () => ( this.editing = !this.editing )

    /**
     *
     *
     */
    private removeVehicle( vehicle: Vehicle ) {
        this.editing && this.detran.remove( vehicle ).subscribe()
    }
}
