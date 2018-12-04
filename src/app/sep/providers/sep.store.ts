import { StoreConfig, getInitialActiveState, EntityState, EntityStore } from '@datorama/akita';
import { FavoriteProtocol } from '../model';
import { Injectable } from '@angular/core';

export interface FavoriteProtocolState extends EntityState<FavoriteProtocol> {}

const initialState: FavoriteProtocolState = { ...getInitialActiveState() };

@Injectable()
@StoreConfig({ name: 'favoriteProtocols', idKey: 'number' })
export class FavoriteProtocolStore extends EntityStore<FavoriteProtocolState, FavoriteProtocol> {
  constructor() {
    super(initialState);
  }
}
