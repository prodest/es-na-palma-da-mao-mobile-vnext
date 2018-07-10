import { NgModule } from '@angular/core';

import { HighlightModule } from './highlight';
import { RemarkModule } from './remark/remark.module';
import { SectionTitleModule } from './section-title';
import { TemplatesModule } from './templates';
import { ValidationMessageModule } from './validation-message';

// import { SectionTitleComponent } from './section-title'
// import { ValidationMessageComponent } from './validation-message'
// const components  = [ ValidationMessageComponent, SectionTitleComponent]

const modules = [ValidationMessageModule, SectionTitleModule, RemarkModule, HighlightModule, TemplatesModule];

@NgModule({
  imports: [...modules],
  exports: [...modules]
})
export class ComponentsModule {}
