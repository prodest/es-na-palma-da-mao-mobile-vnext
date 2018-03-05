import { NgModule } from '@angular/core'

import { NoMenuDirectiveModule } from './no-menu/no-menu-directive.module'

export const Directives = [NoMenuDirectiveModule]

@NgModule({
  declarations: [],
  imports: [...Directives],
  exports: [...Directives]
})
export class DirectivesModule {}
