import { Component, ViewChild, ElementRef } from '@angular/core';
import { IonicPage, Loading, NavController } from 'ionic-angular';
import { AirService } from '../../provider/services';
import { Mapa } from '../../model/mapa.model';
import leaflet from 'leaflet';
import { LoadingService } from '@espm/core';
import { Geolocation } from '@ionic-native/geolocation';

@IonicPage()
@Component({
  selector: 'page-air',
  templateUrl: 'air.html'
})
export class AirPage {
  Air: Mapa[];
  mapaId: any[];
  loading: Loading;
  map: any;
  loadMap: boolean = false;
  longitude: any;
  latitude: any;

  @ViewChild('map') mapContainer: ElementRef;
  constructor(
    private service: AirService,
    private navCtrl: NavController,
    private loadingService: LoadingService,
    private geolocation: Geolocation
  ) {
    this.loading = this.loadingService.show('Carregando mapa');
  }
  async getLocalization() {
    await this.geolocation
      .getCurrentPosition()
      .then(resp => {
        this.latitude = resp.coords.latitude;
        this.longitude = resp.coords.longitude;
      })
      .catch(error => {
        this.latitude = -20.3133586;
        this.longitude = -40.2966826;
        console.log('Error getting location', error);
      });
  }
  ionViewDidLoad() {
    this.allDataQualityAir();
  }
  /**
   * puxa todos os dados
   */
  allDataQualityAir = () => {
    this.service.getAllQualityAir().subscribe(dados => {
      this.Air = dados;
      this.loadMapa();
    });
  };

  /**
   * carrega o mapa
   */
  async loadMapa() {
    let map = leaflet.map('map').setView([-20.2602057, -40.3405489], 11);

    leaflet
      .tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      })
      .addTo(map);

    this.pin(map);

    this.loading.dismiss();
    this.loadMap = true;
    await this.pinPeople(map);
  }

  /**
   *
   * pin peopla
   */

  async pinPeople(map) {
    await this.getLocalization();
    let pessoa = leaflet.icon({
      iconUrl: '../assets/css/images/personinmap.png',
      iconSize: [40, 40]
    });
    if (this.latitude != null && this.longitude != null) {
      leaflet
        .marker([this.latitude, this.longitude], { icon: pessoa })
        .addTo(map)
        .bindPopup('Você está aqui!');
    }
  }
  /**
   *
   */
  pin(map) {
    this.Air.map(item => {
      if (item.Faixa != null && item.Valor !== 0) {
        let pinIcon = leaflet.divIcon({
          className: 'number-icon',
          iconSize: [48, 60],
          html: '<div class="faixa" style="background-color: ' + item.Cor + '">' + item.Iqa.toFixed(0) + '</div>'
        });

        let mark = leaflet.marker([item.Latitude, item.Longitude], { icon: pinIcon });
        map.addLayer(mark);
        mark.on('click', () => {
          // abrir modal com as informações

          this.modal(
            item.IdEstacao,
            this.Air.find(a => a.IdEstacao === item.IdEstacao)
          );
        });
      }
    });
  }

  modal(id, Air) {
    this.navCtrl.push('QualityPointPage', { id: id, air: Air });
  }

  tablePage(id, Air) {
    this.navCtrl.push('QualityAirPage', { id: id, air: Air });
  }
}
