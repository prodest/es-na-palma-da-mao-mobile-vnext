import { DatePipe } from '@angular/common'
import { NgModule } from '@angular/core'

import { DateFormatPipe } from './date-format.pipe'

@NgModule( {
    declarations: [ DateFormatPipe ],
    imports: [],
    exports: [ DateFormatPipe ],
    providers: [ DatePipe ]
} )
export class DateFormatPipeModule { }
