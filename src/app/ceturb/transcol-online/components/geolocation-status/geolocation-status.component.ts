import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output, ChangeDetectorRef } from '@angular/core';
import { Geolocation, Geoposition } from '@ionic-native/geolocation';
import { filter, map } from 'rxjs/operators';
import * as L from 'leaflet';
@Component({
  selector: 'espm-geolocation-status',
  templateUrl: 'geolocation-status.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GeolocationStatusComponent {
  private firstHit: boolean;

  constructor(private geo: Geolocation, private changeDetector: ChangeDetectorRef) {}

  private _searching = true;
  @Output() onLocationUpdate = new EventEmitter<L.LocationEvent>();
  @Output() onLocationUpdateFinished = new EventEmitter();
  @Output() onFirstHit = new EventEmitter<L.LocationEvent>();

  get searching() {
    return this._searching;
  }

  @Input()
  set searching(value: boolean) {
    this._searching = value;
    if (this._searching) {
      this.firstHit = true;
      let watch$ = this.geo
        .watchPosition()
        .pipe(filter((p: Geoposition) => p.coords !== undefined), map(this.geopositionToLocationEvent))
        .subscribe(p => {
          if (this.firstHit) {
            this.onFirstHit.emit(p);
          }
          this.onLocationUpdate.emit(p);
          this.firstHit = false;
        });

      setTimeout(() => {
        this._searching = false;
        this.onLocationUpdateFinished.emit();
        this.changeDetector.markForCheck();
        watch$.unsubscribe();
      }, 10000);
    }
  }

  private geopositionToLocationEvent = (p: Geoposition) => {
    return {
      latlng: {
        lat: p.coords.latitude,
        lng: p.coords.longitude
      },
      accuracy: p.coords.accuracy,
      altitude: p.coords.altitude,
      altitudeAccuracy: p.coords.altitudeAccuracy,
      speed: p.coords.speed,
      timestamp: p.timestamp,
      heading: p.coords.heading
    } as L.LocationEvent;
  };
}
