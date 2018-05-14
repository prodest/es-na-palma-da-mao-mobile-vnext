import { NgModule } from '@angular/core';

import { SectionTitleModule } from './section-title';
import { ValidationMessageModule } from './validation-message';

import { RemarkModule } from './remark/remark.module';
import { HighlightModule } from './highlight/highlight.module';

// import { SectionTitleComponent } from './section-title'
// import { ValidationMessageComponent } from './validation-message'
// const components  = [ ValidationMessageComponent, SectionTitleComponent]

const modules = [ValidationMessageModule, SectionTitleModule, RemarkModule, HighlightModule];

@NgModule({
  imports: [...modules],
  exports: [...modules]
})
export class ComponentsModule {}
