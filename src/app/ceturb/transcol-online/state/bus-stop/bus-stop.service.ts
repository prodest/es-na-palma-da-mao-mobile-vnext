import { BusStopsStore } from './bus-stop.store';
import { BusStop } from './bus-stop.model';
import { ApiCeturbV2Service } from '../../providers';
import { Injectable } from '@angular/core';
import sort from 'fast-sort';

import { Geolocation } from '@ionic-native/geolocation';
import { HaversineService, GeoCoord } from 'ng2-haversine';


@Injectable()
export class BusStopsService {
  myCoordinates: GeoCoord;

  constructor(
    protected store: BusStopsStore,
    private apiCeturb: ApiCeturbV2Service,
    private geolocation: Geolocation,
    private haversineService: HaversineService
  ) {
    this.getDeviceCoordinates();
    this.loadStops();
  }

  private getDeviceCoordinates() {
    this.geolocation.watchPosition().subscribe((data) => {
      console.log("watching position: ", data);
      this.myCoordinates = {
        latitude: data.coords.latitude,
        longitude: data.coords.longitude
      };
    });
  }

  private calcDistance(origin: GeoCoord, destiny: GeoCoord): number {
    return this.haversineService.getDistanceInKilometers(origin, destiny);
  }

  loadStops() {
    this.apiCeturb.allStops().subscribe((stops: BusStop[]) => {
      stops.map((stop: BusStop) => {
        stop.distancia = this.calcDistance(this.myCoordinates, {latitude: stop.latitude, longitude: stop.longitude});
      });
      sort(stops).by([{asc: 'distancia'}]);
      this.store.set(stops);
      this.store.setActive(stops[0].id);
    });
  }
}
