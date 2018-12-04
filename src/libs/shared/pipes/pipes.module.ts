import { NgModule } from '@angular/core';

import { CapitalizePipeModule } from './capitalize';
import { DateFormatPipeModule } from './date-format';
import { FromNowPipeModule } from './from-now';

@NgModule({
  declarations: [],
  imports: [CapitalizePipeModule, DateFormatPipeModule, FromNowPipeModule],
  exports: [CapitalizePipeModule, DateFormatPipeModule, FromNowPipeModule]
})
export class PipesModule {}
