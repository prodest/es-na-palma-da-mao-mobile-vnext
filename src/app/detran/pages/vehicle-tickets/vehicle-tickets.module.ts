import { NgModule } from '@angular/core'
import { IonicPageModule } from 'ionic-angular'

import { VehicleTicketsPage } from './vehicle-tickets'

@NgModule( {
    declarations: [ VehicleTicketsPage ],
    imports: [ IonicPageModule.forChild( VehicleTicketsPage ) ]
} )
export class VehicleTicketsPageModule { }
