import { Injectable } from '@angular/core';
import { StoreConfig, EntityState, getInitialActiveState, EntityStore } from '@datorama/akita';
import { MetaNotification } from '../models';

export interface NotificaitonState extends EntityState<MetaNotification> {}

const initialState: NotificaitonState = { ...getInitialActiveState() };

@Injectable()
@StoreConfig({ name: 'localNotifications', idKey: 'type' })
export class NotificationStore extends EntityStore<NotificaitonState, MetaNotification> {
  /**
   *
   */
  constructor() {
    super(initialState);
  }
}
