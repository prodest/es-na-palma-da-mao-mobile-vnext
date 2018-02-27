import { NgModule } from '@angular/core'
import { IonicPageModule } from 'ionic-angular'

import { AddDriverLicensePage } from './add-driver-license'

@NgModule( {
    declarations: [ AddDriverLicensePage ],
    imports: [ IonicPageModule.forChild( AddDriverLicensePage ) ]
} )
export class AddDriverLicensePageModule { }
