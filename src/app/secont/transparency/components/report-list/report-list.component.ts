import {
  AfterContentInit,
  ChangeDetectionStrategy,
  Component,
  ContentChildren,
  Input,
  QueryList,
  TemplateRef
} from '@angular/core';
import { EspmTemplateDirective } from '@espm/shared';

import { Sort } from '../../components';

@Component({
  selector: 'report-list',
  templateUrl: './report-list.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ReportListComponent implements AfterContentInit {
  @Input() items: any;
  @Input() title: string;
  @ContentChildren(EspmTemplateDirective) templateDirectives: QueryList<EspmTemplateDirective>;
  itemTemplate: TemplateRef<any>;
  headerTemplate: TemplateRef<any>;
  sort: Sort;
  /**
   *
   *
   */
  ngAfterContentInit() {
    this.templateDirectives.forEach(directive => {
      switch (directive.getType()) {
        case 'header':
          this.headerTemplate = directive.template;
          break;

        case 'item':
          this.itemTemplate = directive.template;
          break;
      }
    });
  }
}
