import { DatePipe } from '@angular/common';
import { NgModule } from '@angular/core';

import { DateFormatPipe, ShortDateFormatPipe } from './date-format.pipe';

@NgModule({
  declarations: [DateFormatPipe, ShortDateFormatPipe],
  imports: [],
  exports: [DateFormatPipe, ShortDateFormatPipe],
  providers: [DatePipe]
})
export class DateFormatPipeModule {}
