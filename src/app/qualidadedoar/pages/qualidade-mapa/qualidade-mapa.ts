import { Component, ViewChild, ElementRef } from '@angular/core';
import { IonicPage, Loading } from 'ionic-angular';
import { Mapa } from '../../model/mapa.model';
import { QualidadedoArService } from '../../providers/qualidadedoar.service';
import leaflet from 'leaflet';
// import { QualidadedoArApi } from '../../providers/api-qualidadedoar.service';



@IonicPage({})
@Component({
  selector: 'page-qualidade-license',
  templateUrl: 'qualidade-mapa.html'
})
export class QualidadeMapaPage {

  Air: Mapa[];
  mapaId: any[];
  loading: Loading;
  map: any;
  @ViewChild('map') mapContainer: ElementRef;


  constructor(private service: QualidadedoArService
    // , private apiService: QualidadedoArApi
    ) {}

  ionViewDidEnter() {
    this.allDataQualityAir();
    // setTimeout(()=>{this.loadMapa();},5000);    
  }

  /**
   * puxa todos os dados 
   */
  allDataQualityAir = () => {
    this.service.getAllQualityAir().subscribe(dados => {
      this.Air = dados
      console.log(this.Air)

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
    
    this.Air.map(item =>{
      let mark = leaflet.marker([item.Latitude,item.Longitude]).addTo(map);
      mark.bindPopup(''+item.Iqa, {closeOnClick: false, autoClose: false}).openPopup();
      map.addLayer(mark);
    });
  }

  

   /**
   * recebe um id e puxa os dados referentes 
   */
  // loadQualityId = (id) => {
  //   this.apiService.getId(id).subscribe(dados => {
  //     this.mapaId = dados
  //   });

  // };

   /**
   * 
   */
  
}
