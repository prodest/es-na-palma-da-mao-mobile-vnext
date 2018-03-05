import { NgModule } from '@angular/core'
import { IonicPageModule } from 'ionic-angular'

import { TicketsComponentModule, VehicleComponentModule } from '../../components'
import { VehicleTicketsPage } from './vehicle-tickets'

@NgModule({
  declarations: [VehicleTicketsPage],
  imports: [TicketsComponentModule, VehicleComponentModule, IonicPageModule.forChild(VehicleTicketsPage)]
})
export class VehicleTicketsPageModule {}
