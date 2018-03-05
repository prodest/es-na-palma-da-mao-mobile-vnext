import { NgModule } from '@angular/core'

import { SectionTitleModule } from './section-title'
import { ValidationMessageModule } from './validation-message'

// import { SectionTitleComponent } from './section-title'
// import { ValidationMessageComponent } from './validation-message'
// const components  = [ ValidationMessageComponent, SectionTitleComponent]

const modules = [ValidationMessageModule, SectionTitleModule]

@NgModule({
  imports: [...modules],
  exports: [...modules],
  declarations: []
})
export class ComponentsModule {}
