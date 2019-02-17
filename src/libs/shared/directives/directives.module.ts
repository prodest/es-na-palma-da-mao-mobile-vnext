import { NgModule } from '@angular/core';

import { MatchHeightDirectiveModule } from './match-height/match-height-directive.module';
import { NgSubscribeDirectiveModule } from './ng-subscribe/ng-subscribe.directive.module';
import { NoMenuDirectiveModule } from './no-menu/no-menu-directive.module';

export const Directives = [NoMenuDirectiveModule, MatchHeightDirectiveModule, NgSubscribeDirectiveModule];
export { NoMenuDirectiveModule, MatchHeightDirectiveModule, NgSubscribeDirectiveModule };

@NgModule({
  declarations: [],
  imports: [...Directives],
  exports: [...Directives]
})
export class DirectivesModule {}
