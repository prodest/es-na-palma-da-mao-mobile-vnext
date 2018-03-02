import { NgModule } from '@angular/core'
import { IonicPageModule } from 'ionic-angular'

import { VehicleComponent } from './vehicle.component'

@NgModule( {
    declarations: [ VehicleComponent ],
    imports: [ IonicPageModule ],
    exports: [ VehicleComponent ]
} )
export class VehicleComponentModule { }
