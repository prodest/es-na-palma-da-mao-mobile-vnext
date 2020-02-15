import { Component } from '@angular/core';
import { IonicPage, Loading } from 'ionic-angular';
import { AirService } from '../../provider/services';
import { Mapa } from '../../model/mapa.model';
import { AirApiService } from '../../provider/airApiService';



@IonicPage()
@Component({
  selector: 'page-air',
  templateUrl: 'air.html',
})

export class AirPage {

  Air: Mapa[];
  mapaId: any[];
  loading: Loading;

  constructor(private service: AirService, private apiService: AirApiService) {
    this.loadQualityId(2);
    this.allDataQualityAir();


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
      return this.Air;

    });
  }
  /**
   * 
   */


}
