import { NgModule } from '@angular/core';

import { CapitalizePipeModule } from './capitalize';
import { DateFormatPipeModule } from './date-format';
import { FromNowPipeModule } from './from-now';
import { DistanceFormatPipeModule } from './distance-format';

@NgModule({
  declarations: [],
  imports: [CapitalizePipeModule, DateFormatPipeModule, FromNowPipeModule, DistanceFormatPipeModule],
  exports: [CapitalizePipeModule, DateFormatPipeModule, FromNowPipeModule, DistanceFormatPipeModule]
})
export class PipesModule {}
