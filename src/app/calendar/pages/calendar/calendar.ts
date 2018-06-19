import { Component } from '@angular/core';
import { IonicPage, ModalController, LoadingController, Loading } from 'ionic-angular';
import { EventItem } from './../../model';
import { CalendarApiService } from './../../providers';
import { map, finalize } from 'rxjs/operators';
import * as moment from 'moment';

/**
 * Generated class for the CalendarPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-calendar',
  templateUrl: 'calendar.html'
})
export class CalendarPage {
  loading: Loading;
  calendar: { currentDate?: Date; eventSources?: EventItem[]; dateFormatter?: any } = {};
  selectedCalendars: string[] = [];
  availableCalendars: string[] = [];
  viewTitle: string = '';

  /**
   *
   *
   */
  constructor(
    private modalCtrl: ModalController,
    private calendarApiService: CalendarApiService,
    private loadingCtrl: LoadingController
  ) {}

  /**
   *
   *
   */
  ionViewWillEnter() {
    this.calendar.currentDate = new Date();

    this.calendar.dateFormatter = {
      formatMonthViewDay: (date: Date) => {
        return new Date(date).getDate().toString();
      }
    };

    this.calendarApiService
      .getAvailableCalendars()
      .pipe(
        map(availableCalendars => {
          this.availableCalendars = availableCalendars.map(calendar => calendar.name);
          this.selectedCalendars = this.availableCalendars.slice();
          this.loadCalendars(this.selectedCalendars);
        })
      )
      .subscribe();
  }

  /**
   *
   *
   */
  loadCalendars = (selectedCalendars: string[]) => {
    if (selectedCalendars && selectedCalendars.length > 0) {
      this.showLoading();
      this.calendarApiService
        .getFullCalendars(selectedCalendars)
        .pipe(finalize(() => this.dismissLoading()))
        .subscribe(events => (this.calendar.eventSources = events));
    }
  };

  /**
   *
   *
   */
  onViewTitleChanged(title: string): void {
    this.viewTitle = title;
  }

  /**
   *
   *
   */
  isAllDay(event: EventItem, selectedTime) {
    return (
      event.allDay ||
      (!event.sameDay &&
        event.startTime <
          moment(selectedTime)
            .startOf('day')
            .toDate() &&
        event.endTime >
          moment(selectedTime)
            .endOf('day')
            .toDate())
    );
  }

  /**
   *
   *
   */
  startsIn(event: EventItem, selectedTime) {
    return (
      event.startTime >
      moment(selectedTime)
        .startOf('day')
        .toDate()
    );
  }

  /**
   *
   *
   */
  endsIn(event: EventItem, selectedTime) {
    return (
      event.endTime <
      moment(selectedTime)
        .endOf('day')
        .toDate()
    );
  }

  /**
   *
   *
   */
  openFilter() {
    let filterModal = this.modalCtrl.create('CalendarFilterPage', {
      selectedOrigins: this.selectedCalendars,
      origins: this.availableCalendars
    });
    filterModal.onDidDismiss(this.loadCalendars);
    filterModal.present();
  }

  /**
   *
   *
   */
  onEventSelected(event) {
    // console.log( 'calendar reloadSource' );
    // console.log( event );
    window.open(event.htmlLink, '_system');
  }

  /**
   *
   */
  private showLoading = (message: string = 'Aguarde') => {
    if (this.loading) {
      this.loading.setContent(message);
    } else {
      this.loading = this.loadingCtrl.create({ content: message, dismissOnPageChange: true });
      this.loading.present();
    }
  };

  /**
   *
   */
  private dismissLoading = () => {
    if (this.loading) {
      this.loading.dismiss();
      this.loading = null;
    }
  };
}
