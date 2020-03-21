import { Component, ViewChild, ElementRef } from '@angular/core';
import { IonicPage, Loading, NavController } from 'ionic-angular';
import { AirService } from '../../provider/services';
import { Mapa } from '../../model/mapa.model';
import leaflet from 'leaflet';
import { LoadingService } from '@espm/core';

@IonicPage()
@Component({
  selector: 'page-air',
  templateUrl: 'air.html',
})

export class AirPage {

  Air: Mapa[];
  mapaId: any[];
  loading: Loading;
  map: any;
  loadMap :boolean = false;



  @ViewChild('map') mapContainer: ElementRef;
  constructor(
    private service: AirService, 
    private navCtrl: NavController,
    private loadingService: LoadingService,
    ) {
      this.loading = this.loadingService.show('Carregando mapa');
 
  }

  ionViewDidLoad(){
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
  }
 
  
  /**
   * carrega o mapa
   */
  loadMapa() {
    let map = leaflet.map('map').setView([-20.2602057, -40.3405489], 11);

    leaflet.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    this.pin(map);
    this.loading.dismiss();
    this.loadMap = true;

   
  }

  

  /**
   * 
   */
  pin(map){
    this.Air.map(item =>{
      if (item.Faixa != null && item.Valor != 0){
        let pinIcon = leaflet.divIcon({
          className: "number-icon",
          iconSize: [48, 60],
          html: "<div class=\"faixa\" style=\"background-color: " + item.Cor + "\">" + item.Iqa.toFixed(0) +"</div>"});
  
        let mark = leaflet.marker([item.Latitude,item.Longitude], {icon: pinIcon});
        map.addLayer(mark);
        mark.on('click', () => {
          // abrir modal com as informações
                 
          this.modal(item.IdEstacao, this.Air.find( a => a.IdEstacao === item.IdEstacao));
  
          
        });
      }
      
    });
    
  }

  modal(id, Air){
    this.navCtrl.push('QualityPointPage', { id : id, air:Air });
  }

  tablePage(id, Air){
    this.navCtrl.push('QualityAirPage', { id : id, air:Air });
  }

}
