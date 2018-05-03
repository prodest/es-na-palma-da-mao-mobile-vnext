import './leaflet.bus-stop';
import 'leaflet-pulse-icon/dist/L.Icon.Pulse';
import 'leaflet.markercluster/dist/leaflet.markercluster';

import { AfterViewInit, Component, OnDestroy, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Searchbar } from 'ionic-angular';
import * as L from 'leaflet';
import values from 'lodash-es/values';
import { filter, map, switchMap, takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs/Subject';

import { BusStop } from './../../model/bus-stop';
import { Prevision } from './../../model/prevision';
import { TranscolOnlineApiService } from './../../providers/transcol-online-api.service';

const VITORIA = L.latLng(-20.315894186649725, -40.29565483331681);
const GRANDE_VITORIA = [-38.50708007812501, -17.14079039331664, -42.46215820312501, -23.725011735951796];

interface BusLine {
  identificadorLinha: string;
  linhaId: number;
  pontoDeOrigemId: number;
}

const SEARCH_MIN_LENGTH = 3;

@IonicPage()
@Component({
  selector: 'page-transcol-online',
  templateUrl: 'transcol-online.html'
})
export class TranscolOnlinePage implements AfterViewInit, OnDestroy {
  @ViewChild(Searchbar) searchbar: Searchbar;

  map: L.Map;
  clusters: any = L.markerClusterGroup({
    maxClusterRadius: 80,
    disableClusteringAtZoom: 15,
    spiderfyOnMaxZoom: false,
    showCoverageOnHover: false
  });
  showLabels: boolean;
  allStops: { [id: number]: L.Marker.BusStop };
  searchResults: BusStop[] = [];
  isDetailsOpenned = false;
  isShowingOriginPrevisions = false;
  isShowingLinePrevisions = false;
  isShowingRoutePrevisions = false;
  isSummaryOpenned = false;
  selectedDestination: BusStop | undefined;
  selectedOrigin: BusStop | undefined;
  selectedLine: BusLine | undefined;
  previsions: Prevision[] | undefined = [];
  destinations: BusStop[] = [];
  searching: boolean = false;
  searchId: number = 0;
  placeholder = 'Pesquisar ponto de origem';

  zoom = {
    default: 13,
    minZoom: 8,
    maxZoom: 18
  };
  searchingLocation = false;

  private userPin: L.Marker.Pulse;
  private destroyed$ = new Subject();

  /**
   *
   */
  constructor(navCtrl: NavController, navParams: NavParams, private api: TranscolOnlineApiService) {}

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
  ngAfterViewInit(): void {
    this.searchbar.ionInput
      .pipe(
        takeUntil(this.destroyed$),
        map((e: any) => e.target.value),
        filter(text => text && text.length >= SEARCH_MIN_LENGTH),
        switchMap(text => this.api.searchBusStopsIds(text, this.selectedOrigin ? this.selectedOrigin.id : null)),
        map(this.loadStopsFromMemory),
        map(stops => (this.selectedOrigin ? stops.filter(this.isPossibleDestination) : stops))
      )
      .subscribe(stops => (this.searchResults = stops));
  }

  /**
   *
   *
   */
  ngOnDestroy() {
    this.destroyed$.next();
    this.destroyed$.unsubscribe();
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
  closeDetails = () => {
    this.isDetailsOpenned = false;
  };

  /**
   *
   */
  openDetails = () => {
    this.isDetailsOpenned = true;
  };

  /**
   *
   */
  panToStop = (stop: BusStop) => {
    this.panTo(new L.LatLng(stop.latitude, stop.longitude));
  };

  /**
   *
   */
  panTo = (latlng: L.LatLng) => {
    const newZoom =
      this.map.getZoom() < this.clusters.options.disableClusteringAtZoom
        ? this.clusters.options.disableClusteringAtZoom
        : this.map.getZoom();
    this.map.setView(latlng, newZoom, { animate: true, duration: 0.5 });
  };

  /**
   *
   */
  selectStop = (stop: BusStop) => {
    this.clearSearchResults();

    // se nenhuma origem está selecionada, seleciona como origem
    if (this.selectedOrigin == null) {
      this.selectOrigin(stop);
    } else if (this.isSelectedOrigin(stop)) {
      this.unselectOrigin();
    } else if (this.isSelectedDestination(stop)) {
      this.unselectDestination();
    } else if (!this.isSelectedOrigin(stop) && !this.isPossibleDestination(stop)) {
      /*
         1-Se existe origem selecionada
         2-Se não é a origem selecionada
         3-Não possui destino selecionado
         4-Não está na lista de destinos possíveis
        
         Então seleciona como origem
        */
      this.selectOrigin(stop);
    } else if (!this.isSelectedOrigin(stop) && this.isPossibleDestination(stop)) {
      /*
         1-Se existe origem selecionada
         2-Se não é a origem selecionada
         3-Não possui destino selecionado
         4-Está na lista de destinos possíveis
        
         Então seleciona como destino
        */
      this.selectDestination(stop);
    } else if (!this.isSelectedOrigin(stop) && !this.isSelectedDestination(stop)) {
      this.selectOrigin(stop);
    }
  };

  /**
   *
   */
  selectDestination = (destination: BusStop) => {
    this.selectedDestination = destination;

    // set all other stops icons as secondary
    values(this.allStops)
      .map(marker => marker.stop)
      .filter(stop => !this.isSelectedOrigin(stop))
      .forEach(this.setSecundaryIcon);

    // refresh estimatives
    this.showRoutePrevisions();

    this.getRouteDestinations(this.selectedOrigin.id, this.selectedDestination.id).then(this.plotDestinationMarkers);

    // set destination icon
    this.setDestinationIcon(destination);

    // navigate to selected destination
    this.panToStop(destination);
  };

  /**
   *
   */
  unselectDestination = () => {
    this.selectedDestination = undefined;
    this.selectOrigin(this.selectedOrigin);
    this.navigateToDestinations();
    this.setSearchHint('Selecione um ponto de origem');
  };

  /**
   *
   */
  showRoutePrevisions = (): Promise<Prevision[]> => {
    this.previsions = undefined;
    this.navigateToRoutePrevisions();
    return this.getRoutePrevisions(this.selectedOrigin.id, this.selectedDestination.id);
  };

  /**
   *
   */
  navigateToRoutePrevisions = (clearPrevisions = true) => {
    this.isShowingOriginPrevisions = false;
    this.isShowingLinePrevisions = false;
    this.isShowingRoutePrevisions = true;
  };

  /**
   *
   */
  navigateToDestinations = (clearDestinations = false) => {
    if (clearDestinations) {
      this.destinations = [];
    }

    this.isShowingOriginPrevisions = false;
    this.isShowingLinePrevisions = false;
    this.isShowingRoutePrevisions = false;
  };

  /**
   *
   */
  isPossibleDestination = (stop: BusStop): boolean => {
    return !!this.destinations.length && !!this.destinations.find(s => s.id === stop.id);
  };

  /**
   *
   */
  async updateDestinations(origin: BusStop) {
    const timer = setTimeout(() => this.setSpinIcon(origin), 800);

    try {
      const destinations = await this.getOriginDestinations(origin.id);
      this.plotDestinationMarkers(destinations);
      this.setOriginIcon(origin);
    } finally {
      clearInterval(timer);
    }
  }

  /**
   *
   */
  async getRouteDestinations(originId: number, destinationId: number): Promise<BusStop[]> {
    const ids = await this.api.getBusStopsIdsByRoute(originId, destinationId);
    this.destinations = this.loadStopsFromMemory(ids);
    return this.destinations;
  }

  /**
   *
   */
  async getOriginDestinations(originId: number): Promise<BusStop[]> {
    const ids = await this.api.getBusStopsIdsByOrigin(originId);
    this.destinations = this.loadStopsFromMemory(ids);
    return this.destinations;
  }

  /**
   *
   */
  async getOriginPrevisions(originId: number): Promise<Prevision[]> {
    this.previsions = await this.api.getPrevisionsByOrigin(originId);
    return this.previsions;
  }

  /**
   *
   */
  async getLinePrevisions(line: BusLine): Promise<Prevision[]> {
    this.previsions = await this.api.getPrevisionsByOriginAndLine(line.pontoDeOrigemId, line.linhaId);
    return this.previsions;
  }

  /**
   *
   */
  async getRoutePrevisions(originId: number, destinationId: number): Promise<Prevision[]> {
    this.previsions = await this.api.getPrevisionsByOriginAndDestination(originId, destinationId);
    return this.previsions;
  }

  get isRouteSelected(): boolean {
    return !!this.selectedOrigin && !!this.selectedDestination;
  }

  /**
   *
   */
  onPrevisionsButtonClick = () => {
    if (this.isDetailsOpenned) {
      if (this.isShowingOriginPrevisions || this.isShowingRoutePrevisions) {
        this.closeDetails();
      } else {
        this.showOriginPrevisions();
      }
    } else {
      if (this.isRouteSelected) {
        this.showRoutePrevisions();
      } else {
        this.showOriginPrevisions();
      }
      this.openDetails();
    }
  };

  /**
   *
   */
  showOriginPrevisions = (): Promise<Prevision[]> => {
    this.previsions = undefined;
    this.selectedLine = undefined;
    this.navigateToOriginPrevisions();
    return this.getOriginPrevisions(this.selectedOrigin.id);
  };

  /**
   *
   */
  navigateToOriginPrevisions = (clearPrevisions = true) => {
    this.isShowingOriginPrevisions = true;
    this.isShowingLinePrevisions = false;
    this.isShowingRoutePrevisions = false;
  };

  /**
   *
   */
  showLinePrevisions = (line: BusLine): Promise<Prevision[]> => {
    this.previsions = undefined;
    this.selectedLine = line;
    this.navigateToLinePrevisions();
    return this.getLinePrevisions(line);
  };

  /**
   *
   */
  navigateToLinePrevisions = (clearPrevisions = true) => {
    this.isShowingOriginPrevisions = false;
    this.isShowingLinePrevisions = true;
    this.isShowingRoutePrevisions = false;
  };

  /**
   *
   */
  clearSearchResults = () => {
    this.searchResults = [];
  };

  /**
   *
   */
  private setSearchHint = (hint: string) => {
    if (!this.searchbar) {
      return;
    }
    this.searchbar.placeholder = hint;
    this.searchbar.value = '';
  };

  /**
   *
   */
  private loadStopsFromMemory = (ids: number[]): BusStop[] => {
    return ids
      .map(id => this.allStops[id])
      .filter(m => !!m)
      .map(m => m.stop);
  };

  /**
   *
   */
  private plotDestinationMarkers = (destineStops: BusStop[] = []) => {
    destineStops.filter(stop => !this.isSelectedOrigin(stop)).forEach(this.setAvailableDestinationIcon);
  };

  /**
   *
   */
  private selectOrigin = (origin: BusStop) => {
    this.unselectAll();

    // todo this.$rootScope.footerPanel = this;

    this.selectedOrigin = origin;

    this.isSummaryOpenned = true;

    // set all other stops icons as secondary
    values(this.allStops)
      .map(marker => marker.stop)
      .filter(stop => !this.isSelectedOrigin(stop))
      .forEach(this.setSecundaryIcon);

    this.setOriginIcon(origin);

    // navigate to selected origin
    this.panToStop(origin);

    // refresh estimatives
    this.getOriginPrevisions(origin.id);
    this.updateDestinations(origin);

    this.setSearchHint('Selecione um ponto de destino');
  };

  /**
   *
   */
  private unselectOrigin = () => {
    values(this.allStops)
      .map(marker => marker.stop)
      .forEach(this.setDefaultIcon);
    this.closeAllScreens();
    this.unselectAll();
    this.clearSearchResults();

    this.setSearchHint('Selecione um ponto de origem');
  };

  /**
   *
   */
  private setSpinIcon = (stop: BusStop) => {
    this.setIcon(stop, { spin: true, role: 'origin' }, 2000);
  };

  /**
   *
   */
  private setDefaultIcon = (stop: BusStop) => {
    this.setIcon(stop, { role: 'default' }, 100);
  };

  /**
   *
   */
  private setSecundaryIcon = (stop: BusStop) => {
    this.setIcon(stop, { role: 'secondary' }, 100);
  };

  /**
   *
   */
  private setAvailableDestinationIcon = (stop: BusStop) => {
    this.setIcon(stop, { role: 'available-destination' }, 1000);
  };

  /**
   *
   */
  private isSelectedOrigin = (stop: BusStop): boolean => {
    return !!this.selectedOrigin && this.selectedOrigin.id === stop.id;
  };

  /**
   *
   */
  private isSelectedDestination = (stop: BusStop): boolean => {
    return !!this.selectedDestination && this.selectedDestination.id === stop.id;
  };

  /**
   *
   */
  private unselectAll = () => {
    this.selectedOrigin = this.selectedLine = this.selectedDestination = undefined;
    this.previsions = this.destinations = [];
  };

  /**
   *
   */
  private setOriginIcon = (stop: BusStop) => {
    this.setIcon(stop, { role: 'origin' }, 2000);
  };

  /**
   *
   *
   */
  private setDestinationIcon = (stop: BusStop) => {
    this.setIcon(stop, { role: 'destination' }, 1000);
  };

  /**
   *
   *
   */
  private setIcon = (stop: BusStop, options: L.Icon.BusStopIconOptions, zIndexOffset: number) => {
    if (!stop) {
      return;
    }
    const marker = this.allStops[stop.id];
    marker.setIcon(L.icon.busStop({ ...options, direction: stop.direcao, type: stop.tipo }));
    marker.setZIndexOffset(zIndexOffset);
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
    this.unselectOrigin();
    this.showLabels = false;
  };

  /**
   *
   */
  private closeAllScreens = () => {
    // todo
    // if (this.$rootScope.footerPanel) {
    //   delete this.$rootScope.footerPanel;
    // }
    this.isDetailsOpenned = false;
    this.isSummaryOpenned = false;
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
    console.log(`Adicionando camada com ${stops.length} paradas ao mapa`);
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
      if (this.isDetailsOpenned) {
        this.closeDetails();
      }
      this.selectStop(stop);
    });
    return marker;
  };
}
