import { Component } from '@angular/core';
import { IonicPage, NavParams } from 'ionic-angular';
import { AirApiService } from '../../provider/airApiService';
import { MapaId } from '../../model/mapaId.model';
import { Mapa } from '../../model/mapa.model';


@IonicPage()
@Component({
  selector: 'page-quality-point',
  templateUrl: 'point.html',
})

export class QualityPoint {

  idPoint: number;
  infoPoint : MapaId[];
  point : Mapa[];
  constructor( private apiService: AirApiService, public navParams: NavParams){ 
    this.idPoint =  this.navParams.get('id');
    this.point =  this.navParams.get('air');
  }

  ionViewDidEnter() {
    this.loadQualityId(this.idPoint);
  }

  /**
   * recebe um id e puxa os dados referentes 
   */
  loadQualityId = (id) => {
    this.apiService.getId(id).subscribe(dados => {
      this.infoPoint = dados;
      console.log(this.point)
    });
  };

}
