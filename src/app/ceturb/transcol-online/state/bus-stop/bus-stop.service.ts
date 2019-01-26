import { BusStopsStore } from './bus-stop.store';
import { BusStop } from './bus-stop.model';
import { ApiCeturbV2Service } from '../../providers';
import { Injectable } from '@angular/core';
import sort from 'fast-sort';

import { Geoposition } from '@ionic-native/geolocation';
import { HaversineService, GeoCoord } from 'ng2-haversine';


@Injectable()
export class BusStopsService {

  constructor(
    protected store: BusStopsStore,
    private apiCeturb: ApiCeturbV2Service,
    private haversineService: HaversineService
  ) {
    
  }

  private calcDistance(origin: GeoCoord, destiny: GeoCoord): number {
    return this.haversineService.getDistanceInKilometers(origin, destiny);
  }

  updateStops(coordinates: Geoposition) {
    console.log("BusStopsService - Coordinates", coordinates);
    this.apiCeturb.allStops()
    .pipe()
    .subscribe(
      (stops: BusStop[]) => {
        stops.map((stop: BusStop) => {
          stop.distancia = this.calcDistance(coordinates.coords, {latitude: stop.latitude, longitude: stop.longitude});
        });
        sort(stops).by([{asc: 'distancia'}]);
        this.store.set(stops);
        this.store.setActive(stops[0].id);
        console.log("BusStopsStore loaded!");
      }
    );
  }
}
