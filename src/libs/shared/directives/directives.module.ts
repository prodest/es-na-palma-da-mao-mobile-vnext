import { NgModule } from '@angular/core';

import { MatchHeightDirectiveModule } from './match-height/match-height-directive.module';
import { NoMenuDirectiveModule } from './no-menu/no-menu-directive.module';

export const Directives = [NoMenuDirectiveModule, MatchHeightDirectiveModule];
export { NoMenuDirectiveModule, MatchHeightDirectiveModule };

@NgModule({
  declarations: [],
  imports: [...Directives],
  exports: [...Directives]
})
export class DirectivesModule {}
