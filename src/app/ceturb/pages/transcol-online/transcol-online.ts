import { TranscolOnlineApiService } from './../../providers/transcol-online-api.service';
import { BusStop } from './../../model/bus-stop';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import values from 'lodash-es/values';
import * as L from 'leaflet';
import './leaflet.bus-stop';
import 'leaflet-pulse-icon/dist/L.Icon.Pulse';
import 'leaflet.markercluster/dist/leaflet.markercluster';

const VITORIA = L.latLng(-20.315894186649725, -40.29565483331681);
const GRANDE_VITORIA = [-38.50708007812501, -17.14079039331664, -42.46215820312501, -23.725011735951796];

@IonicPage()
@Component({
  selector: 'page-transcol-online',
  templateUrl: 'transcol-online.html'
})
export class TranscolOnlinePage {
  map: L.Map;
  public clusters: any = L.markerClusterGroup({
    maxClusterRadius: 80,
    disableClusteringAtZoom: 15,
    spiderfyOnMaxZoom: false,
    showCoverageOnHover: false
  });
  showLabels: boolean;
  allStops: { [id: number]: L.Marker.BusStop };
  zoom = {
    default: 13,
    minZoom: 8,
    maxZoom: 18
  };
  searchingLocation = false;

  private userPin: L.Marker.Pulse;

  /**
   *
   */
  constructor(public navCtrl: NavController, public navParams: NavParams, private api: TranscolOnlineApiService) {}

  /**
   *
   */
  async ionViewDidLoad() {
    this.map = this.createMap();
    this.getUserLocation();
    this.renderBusStops(await this.api.getBusStopsByArea(GRANDE_VITORIA));
  }

  /**
   *
   */
  getUserLocation = () => {
    this.searchingLocation = true;
    this.map.locate({ setView: true, maxZoom: 16, timeout: 5000, enableHighAccuracy: true });
  };

  /**
   *
   */
  private createMap = () => {
    const map = L.map('map', {
      tap: false, // !important
      zoomControl: false,
      center: VITORIA,
      zoom: this.zoom.default,
      minZoom: this.zoom.minZoom,
      maxZoom: this.zoom.maxZoom,
      maxBounds: L.latLngBounds(
        L.latLng(-18.713894456784224, -39.07836914062501),
        L.latLng(-22.009267904493782, -41.055908203125)
      )
    });

    L.tileLayer(
      `http://mapas.geocontrol.com.br/image-cache/imagem/xyz/OpenStreetMaps?x={x}&y={y}&zoom={z}&projeto=GVBUS-BUSCABUS`
    ).addTo(map);

    map.on('moveend', this.onMapMove);
    map.on('click', this.clearMapSelection);
    map.on('locationfound', this.onLocationFound);
    map.on('locationerror', this.onLocationError);

    return map;
  };

  /**
   *
   */
  private onMapMove = () => {
    this.logMapInfo();
  };

  /**
   *
   */
  private logMapInfo = () => {
    console.log('zoom:', this.map.getZoom());
    console.log('bounds:', this.map.getBounds());
    console.log('center:', this.map.getCenter());
  };

  /**
   *
   */
  private onLocationFound = (e: L.LocationEvent) => {
    this.searchingLocation = false;
    if (this.userPin) {
      this.map.removeLayer(this.userPin);
    }

    this.userPin = L.marker.pulse(e.latlng, { iconSize: [20, 20], color: '#07C', heartbeat: 1 }).addTo(this.map);
  };

  /**
   *
   */
  private onLocationError = error => {
    this.searchingLocation = false;
    console.log('Error getting location', error);
  };

  /**
   *
   */
  private clearMapSelection = () => {
    // todo this.unselectOrigin();
    this.showLabels = false;
  };

  /**
   *
   */
  private renderBusStops = (stops: BusStop[]) => {
    this.allStops = stops.reduce((map, stop) => {
      map[stop.id] = this.createMarker(stop);
      return map;
    }, {});

    this.clusters.clearLayers();
    this.clusters.addLayers(values(this.allStops));
    this.map.addLayer(this.clusters);
    console.log(`adicionando camada com ${stops.length} paradas ao mapa`);
  };

  /**
   *
   *
   */
  private createMarker = (stop: BusStop) => {
    const marker = L.marker.busStop(stop, {
      zIndexOffset: 100,
      icon: L.icon.busStop({ role: 'default', direction: stop.direcao, type: stop.tipo })
    });

    marker.on('click', e => {
      // if (this.isDetailsOpenned) {
      //   this.closeDetails();
      // }
      // this.selectStop(stop);
      alert(stop.descricao);
    });
    return marker;
  };
}
