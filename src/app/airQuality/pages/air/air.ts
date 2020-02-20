import { Component, ViewChild, ElementRef } from '@angular/core';
import { IonicPage, Loading } from 'ionic-angular';
import { AirService } from '../../provider/services';
import { Mapa } from '../../model/mapa.model';
import { AirApiService } from '../../provider/airApiService';
import leaflet from 'leaflet';
// import { markDirty } from '@angular/core/src/render3';

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
  @ViewChild('map') mapContainer: ElementRef;
  constructor(private service: AirService, private apiService: AirApiService) {
   

  }

  ionViewDidEnter() {
    this.allDataQualityAir();
    setTimeout(()=>{
      this.loadMapa();
    },5000);    
  }
  
  /**
   * recebe um id e puxa os dados referentes 
   */
  loadQualityId = (id) => {
    this.apiService.getId(id).subscribe(dados => {
      this.mapaId = dados
    });

  };


  /**
   * puxa todos os dados 
   */
  allDataQualityAir = () => {
    this.service.getAllQualityAir().subscribe(dados => {
      this.Air = dados
      console.log(this.Air)
      return this.Air;

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

   
  }

  /**
   * 
   */
  pin(map){
    this.Air.map(item =>{
      let mark = leaflet.marker([item.Latitude,item.Longitude]);
      map.addLayer(mark);
      mark.on('click', function(){
        // abrir modal com as informações
        console.log('blabla');
        // console.log(this.loadQualityId(item.Estacao));
        
      });
    });
    
  }

}
