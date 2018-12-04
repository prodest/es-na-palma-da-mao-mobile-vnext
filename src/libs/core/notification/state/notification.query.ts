import { Injectable } from '@angular/core';
import { QueryEntity, HashMap } from '@datorama/akita';
import { NotificationStore, NotificaitonState } from './notification.store';
import { MetaNotification, TypeNotification } from '../models';

@Injectable()
export class NotificationQuery extends QueryEntity<NotificaitonState, MetaNotification> {
  /**
   *
   */
  getNotificationByType(type: TypeNotification): HashMap<MetaNotification> {
    return this.getAll({
      asObject: true,
      filterBy: entity => entity.type === type
    });
  }

  /**
   *
   */
  constructor(protected store: NotificationStore) {
    super(store);
  }
}
