import { Component, ViewChild, ElementRef } from '@angular/core';
import { IonicPage, NavParams } from 'ionic-angular';
// import { AirApiService } from '../../provider/airApiService';
import { MapaId } from '../../model/mapaId.model';
// import { Mapa } from '../../model/mapa.model';


@IonicPage()
@Component({
  selector: 'page-quality-point',
  templateUrl: 'point.html',
})

export class QualityPoint {
  @ViewChild('barchart') barchart : ElementRef;
  idPoint: number;
  infoPoint : MapaId[];
  point : any;
  iqar: number;
  graphDataHora : [];

 
  constructor( 
    // private apiService: AirApiService, 
    public navParams: NavParams){ 
      this.idPoint =  this.navParams.get('id');
      this.point =  this.navParams.get('air');
      this.iqar = Math.round(this.point.Iqa);
      

      this.point = {
        Iqa: 2.251,
        Estacao: null,
        Medicao: null,
        Cor: "#59FF2F",
        Faixa: "Boa",
        DataHora: "2020-02-28T19:30:00",
        Descricao: "RAMQAr 9",
        Valor: 0.35708106778976,
        Latitude: -20.220866,
        Longitude: -40.233179,
        IdEstacao: 9,
        Localizacao: "Cidade Continental",
        Poluente: "Dióxido de Enxofre"
      }

      this.infoPoint = [{
        Poluente: "Dióxido de Nitrogênio",
        PoluenteSigla: "(NO₂)",
        Estacao: "RAMQAr 9",
        Max: "5.65",
        Min: "0.23",
        DataHora: ["2020-02-26T21:30:00", "2020-02-26T22:30:00", "2020-02-26T23:30:00", "2020-02-27T00:30:00", "2020-02-27T01:30:00", "2020-02-27T02:30:00", "2020-02-27T03:30:00", "2020-02-27T04:30:00", "2020-02-27T05:30:00", "2020-02-27T06:30:00", "2020-02-27T07:30:00", "2020-02-27T08:30:00", "2020-02-27T09:30:00", "2020-02-27T10:30:00", "2020-02-27T11:30:00", "2020-02-27T12:30:00", "2020-02-27T13:30:00", "2020-02-27T14:30:00", "2020-02-27T15:30:00", "2020-02-27T16:30:00", "2020-02-27T17:30:00", "2020-02-27T18:30:00", "2020-02-27T19:30:00", "2020-02-27T20:30:00", "2020-02-27T21:30:00", "2020-02-27T22:30:00", "2020-02-27T23:30:00", "2020-02-28T00:30:00", "2020-02-28T01:30:00", "2020-02-28T02:30:00", "2020-02-28T03:30:00", "2020-02-28T04:30:00", "2020-02-28T05:30:00", "2020-02-28T06:30:00", "2020-02-28T07:30:00", "2020-02-28T08:30:00", "2020-02-28T09:30:00", "2020-02-28T10:30:00", "2020-02-28T11:30:00", "2020-02-28T13:30:00", "2020-02-28T14:30:00", "2020-02-28T15:30:00", "2020-02-28T16:30:00", "2020-02-28T17:30:00", "2020-02-28T18:30:00", "2020-02-28T19:30:00"],
        ValorIqa: ["0.53", "0.48", "0.44", "0.23", "0.27", "0.23", "0.40", "0.28", "0.63", "0.81", "0.60", "0.60", "0.67", "0.86", "0.55", "3.18", "3.78", "3.56", "4.09", "4.90", "5.65", "4.26", "1.57", "0.77", "0.72", "0.55", "0.87", "0.79", "0.66", "0.51", "0.57", "0.60", "0.53", "0.74", "1.14", "1.58", "1.59", "1.45", "0.59", "1.92", "1.61", "1.55", "1.68", "1.87", "1.57", "1.66"],
        Cor: ["#59FF2F", "#59FF2F", "#59FF2F", "#59FF2F", "#59FF2F", "#59FF2F", "#59FF2F", "#59FF2F", "#59FF2F", "#59FF2F", "#59FF2F", "#59FF2F", "#59FF2F", "#59FF2F", "#59FF2F", "#59FF2F", "#59FF2F", "#59FF2F", "#59FF2F", "#59FF2F", "#59FF2F", "#59FF2F", "#59FF2F", "#59FF2F", "#59FF2F", "#59FF2F", "#59FF2F", "#59FF2F", "#59FF2F", "#59FF2F", "#59FF2F", "#59FF2F", "#59FF2F", "#59FF2F", "#59FF2F", "#59FF2F", "#59FF2F", "#59FF2F", "#59FF2F", "#59FF2F", "#59FF2F", "#59FF2F", "#59FF2F", "#59FF2F", "#59FF2F", "#59FF2F"],
        FaixaIQA: ["Boa", "Boa", "Boa", "Boa", "Boa", "Boa", "Boa", "Boa", "Boa", "Boa", "Boa", "Boa", "Boa", "Boa", "Boa", "Boa", "Boa", "Boa", "Boa", "Boa", "Boa", "Boa", "Boa", "Boa", "Boa", "Boa", "Boa", "Boa", "Boa", "Boa", "Boa", "Boa", "Boa", "Boa", "Boa", "Boa", "Boa", "Boa", "Boa", "Boa", "Boa", "Boa", "Boa", "Boa", "Boa", "Boa"]
      },{
        Poluente: "Dióxido de Enxofre",
        PoluenteSigla: "(SO₂)",
        Estacao: "RAMQAr 9",
        Max: "2.78",
        Min: "0.69",
        DataHora: ["2020-02-26T21:30:00", "2020-02-26T22:30:00", "2020-02-26T23:30:00", "2020-02-27T00:30:00", "2020-02-27T01:30:00", "2020-02-27T02:30:00", "2020-02-27T03:30:00", "2020-02-27T04:30:00", "2020-02-27T05:30:00", "2020-02-27T06:30:00", "2020-02-27T07:30:00", "2020-02-27T08:30:00", "2020-02-27T09:30:00", "2020-02-27T10:30:00", "2020-02-27T11:30:00", "2020-02-27T12:30:00", "2020-02-27T13:30:00", "2020-02-27T14:30:00", "2020-02-27T15:30:00", "2020-02-27T16:30:00", "2020-02-27T17:30:00", "2020-02-27T18:30:00", "2020-02-27T19:30:00", "2020-02-27T20:30:00", "2020-02-27T21:30:00", "2020-02-27T22:30:00", "2020-02-27T23:30:00", "2020-02-28T00:30:00", "2020-02-28T01:30:00", "2020-02-28T02:30:00", "2020-02-28T03:30:00", "2020-02-28T04:30:00", "2020-02-28T05:30:00", "2020-02-28T06:30:00", "2020-02-28T07:30:00", "2020-02-28T08:30:00", "2020-02-28T09:30:00", "2020-02-28T10:30:00", "2020-02-28T11:30:00", "2020-02-28T12:30:00", "2020-02-28T13:30:00", "2020-02-28T15:30:00", "2020-02-28T16:30:00", "2020-02-28T17:30:00", "2020-02-28T18:30:00", "2020-02-28T19:30:00"],
        ValorIqa: ["0.69", "0.70", "0.71", "0.72", "0.73", "0.73", "0.74", "0.74", "0.75", "0.76", "0.78", "0.78", "0.79", "0.79", "0.80", "0.80", "0.80", "0.81", "0.87", "1.00", "1.16", "1.22", "1.25", "1.28", "1.30", "1.32", "1.33", "1.35", "1.36", "1.38", "1.40", "1.42", "1.43", "1.44", "1.44", "1.44", "1.43", "1.43", "1.44", "2.70", "2.78", "2.76", "2.59", "2.39", "2.29", "2.25"],
        Cor: ["#59FF2F", "#59FF2F", "#59FF2F", "#59FF2F", "#59FF2F", "#59FF2F", "#59FF2F", "#59FF2F", "#59FF2F", "#59FF2F", "#59FF2F", "#59FF2F", "#59FF2F", "#59FF2F", "#59FF2F", "#59FF2F", "#59FF2F", "#59FF2F", "#59FF2F", "#59FF2F", "#59FF2F", "#59FF2F", "#59FF2F", "#59FF2F", "#59FF2F", "#59FF2F", "#59FF2F", "#59FF2F", "#59FF2F", "#59FF2F", "#59FF2F", "#59FF2F", "#59FF2F", "#59FF2F", "#59FF2F", "#59FF2F", "#59FF2F", "#59FF2F", "#59FF2F", "#59FF2F", "#59FF2F", "#59FF2F", "#59FF2F", "#59FF2F", "#59FF2F", "#59FF2F"],
        FaixaIQA: ["Boa", "Boa", "Boa", "Boa", "Boa", "Boa", "Boa", "Boa", "Boa", "Boa", "Boa", "Boa", "Boa", "Boa", "Boa", "Boa", "Boa", "Boa", "Boa", "Boa", "Boa", "Boa", "Boa", "Boa", "Boa", "Boa", "Boa", "Boa", "Boa", "Boa", "Boa", "Boa", "Boa", "Boa", "Boa", "Boa", "Boa", "Boa", "Boa", "Boa", "Boa", "Boa", "Boa", "Boa", "Boa", "Boa"]
      }]

    for(let i=0;i< this.infoPoint.length; i++){
      let newArrDataHora = [];
      newArrDataHora = this.infoPoint[i].DataHora;
      
    }

    
    // this.graphDataHora = this.arrDataHora(this.infoPoint);
    
  } 
  

  formatDate(dateString){
    const date = new Date(dateString);
    const day = date.getDate();
    const month = date.getMonth();
    const year = date.getFullYear();
    const hour = date.getHours();
    const minute = date.getMinutes();

    return `${day}/${month}/${year} às ${hour}:${minute}h`;
  }

  parseLabels(labels: [string]) {
    const newArr = [];
    labels.map( (label) => {newArr.push(label.substring(11, 16))});
    
    return newArr;
  }

  arrDataHora(info : MapaId[]){
    for(let i=0;i< info.length; i++){
     
      const newArr = [];
      for(let j=0;j< info[i].DataHora.length; j++){
        
        newArr.push(info[i].DataHora[j].substring(11,16));

      }
      console.log(newArr)
      return newArr;
    }
    

  }


  

  chartOptions = {
    responsive: true
  };

  
  // Horários
  chartLabels = ['21:30', '22:30', '23:30', '00:30'];


 


  // ionViewDidEnter() {
  //   this.loadQualityId(this.idPoint);
  // }

  // /**
  //  * recebe um id e puxa os dados referentes 
  //  */
  // loadQualityId = (id) => {
  //   this.apiService.getId(id).subscribe(dados => {
  //     this.infoPoint = dados;
  //     console.log(this.infoPoint)
  //   });
  // };

}
