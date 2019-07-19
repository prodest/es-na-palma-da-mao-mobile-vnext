import { Injectable } from '@angular/core';
import { QueryEntity } from '@datorama/akita';
import isEqual from 'lodash-es/isEqual';

import { ItemMenu } from '../models';
import { MenusStore, MenusState } from './menus-store';
import { distinctUntilChanged, map } from 'rxjs/operators';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class MenusQuery extends QueryEntity<MenusState, ItemMenu> {
  favorites$: Observable<ItemMenu[]> = this.selectAll().pipe(map(lines => lines.filter(l => l.isChecked)), distinctUntilChanged(isEqual));
  /**
   *
   */
  constructor(protected store: MenusStore) {
    super(store);
  }
}
