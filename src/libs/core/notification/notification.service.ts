import { LocalNotifications } from '@ionic-native/local-notifications';
import { Injectable } from '@angular/core';
import { TypeNotification } from './models';
import { NotificationStore } from './state';
import * as moment from 'moment';

@Injectable()
export class NotificationService {
  constructor(private lnot: LocalNotifications, private store: NotificationStore) {}

  scheduleCNHNotifications(cnhExpireMoment: moment.Moment) {
    this.scheduleExpiringCNH(cnhExpireMoment);
    this.scheduleExpiredCNH(cnhExpireMoment);
  }

  private scheduleExpiringCNH(cnhExpireMoment: moment.Moment) {
    this.scheduleNotification(
      TypeNotification.CNHExpiring,
      'Sua carteira de motorista vai vencer em 1 mes',
      'cnh',
      cnhExpireMoment.subtract(1, 'month').toDate()
    );
  }

  private scheduleExpiredCNH(cnhExpireDate: moment.Moment) {
    this.scheduleNotification(
      TypeNotification.CNHExpired,
      'Sua carteira de motorista vence hoje, não esqueça de renová-la',
      'cnh',
      cnhExpireDate.toDate()
    );
  }

  /** Private Methods **/

  private scheduleNotification(
    typeId: TypeNotification,
    message: string,
    icon: string = 'notification',
    date: Date = new Date()
  ) {
    // Schedule delayed notification
    this.lnot.schedule({
      id: typeId,
      text: message,
      trigger: { at: date },
      led: 'FF0000',
      smallIcon: `res://${icon}`
    });

    this.store.createOrReplace(typeId, { type: typeId, date: date });
  }
}
