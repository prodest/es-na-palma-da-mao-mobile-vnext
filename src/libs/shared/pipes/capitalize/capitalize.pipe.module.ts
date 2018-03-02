import { NgModule } from '@angular/core'

import { CapitalizePipe } from './capitalize.pipe'

@NgModule( {
    declarations: [ CapitalizePipe ],
    imports: [],
    exports: [ CapitalizePipe ]
} )
export class CapitalizePipeModule { }
