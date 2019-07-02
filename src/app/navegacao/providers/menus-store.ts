import { ItemMenu } from '../models';
import { EntityState, getInitialActiveState, EntityStore, StoreConfig } from '@datorama/akita';
import { Injectable } from '@angular/core';

export interface MenusState extends EntityState<ItemMenu> {}

const initialState: MenusState = { ...getInitialActiveState() };

@Injectable()
@StoreConfig({ name: 'datamenus', idKey: 'id' })
export class MenusStore extends EntityStore<MenusState, ItemMenu> {
  /**
   *
   */
  constructor() {
    super(initialState);
  }
}
