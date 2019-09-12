import { Component, ViewChild } from '@angular/core';
import { IonicPage, Loading, LoadingController, ModalController, NavController } from 'ionic-angular';
import { CalendarComponent } from 'ionic2-calendar/calendar';
import { finalize, map } from 'rxjs/operators';

import { EventItem } from './../../model';
import { CalendarApiService } from './../../providers';

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
  @ViewChild(CalendarComponent) myCalendar: CalendarComponent;

  loading: Loading;
  calendar: { currentDate?: Date; eventSources: EventItem[]; dateFormatter?: any } = {
    eventSources: []
  };
  selectedCalendars: string[] = [];
  availableCalendars: string[] = [];
  viewTitle: string = '';

  /**
   *
   *
   */
  constructor(
    private navCtrl: NavController,
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
        .subscribe(events => {
          let firstTime = this.calendar.eventSources.length === 0;
          this.calendar.eventSources = events;

          if (firstTime) {
            this.myCalendar.loadEvents();
          }
        });
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
   */
  back=()=>{this.navCtrl.pop()};

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
      this.loading.dismiss().catch(console.log);
      this.loading = null;
    }
  };
}
