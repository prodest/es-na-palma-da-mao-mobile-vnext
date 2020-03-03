import { Component, ViewChild, ElementRef, OnInit } from '@angular/core';
import { IonicPage, NavParams } from 'ionic-angular';
import { AirApiService } from '../../provider/airApiService';
import { MapaId } from '../../model/mapaId.model';
import { Mapa } from '../../model/mapa.model';


@IonicPage()
@Component({
  selector: 'page-quality-point',
  templateUrl: 'point.html',
})

export class QualityPointPage implements OnInit {
 
  @ViewChild('barchart') barchart : ElementRef;
  idPoint: number;
  infoPoint : MapaId[];
  point : Mapa;
  iqar: number;
  formatedDate: string;
 
  constructor(private apiService: AirApiService,public navParams: NavParams){ 
      this.idPoint =  this.navParams.get('id');
      this.point =  this.navParams.get('air');
  } 
 
  ngOnInit(): void {
    this.formatedDate = this.formatDate(this.point.DataHora);
  }
 
  formatDate(dateString){
    const date = new Date(dateString);
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    const hour = date.getHours();
    const minute = date.getMinutes();

    return `${day}/${month}/${year} às ${hour}:${minute}h`;
  }

  chartOptions = {
    responsive: true
  };

  ionViewDidEnter() {
    this.loadQualityId(this.idPoint);
    
  }



  /**
   * recebe um id e puxa os dados referentes 
   */
  loadQualityId = (id) => {
    this.apiService.getId(id).subscribe(dados => {
      this.infoPoint = dados;
      this.refreshHour();
      this.refreshMinMax();
      this.iqar = Math.round(this.point.Iqa);
    });
  };

  refreshHour(){
    for(let i=0; i < this.infoPoint.length; i++)
    {
      let newArr = [];
      this.infoPoint[i].DataHora.map((data) => { newArr.push(data.substring(11, 16)) });
      this.infoPoint[i].DataHora = newArr;
    } 
  }

  refreshMinMax(){
    for(let i=0; i < this.infoPoint.length; i++)
    {
     this.infoPoint[i].Min = Math.round(parseInt(this.infoPoint[i].Min,10)).toString(); 
     this.infoPoint[i].Max = Math.round(parseInt(this.infoPoint[i].Max,10)).toString();
    } 
  }

}
