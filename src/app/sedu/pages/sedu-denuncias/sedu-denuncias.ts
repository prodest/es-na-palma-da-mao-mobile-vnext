import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Slides } from 'ionic-angular';
import { Denuncia } from '../../model/denuncia';

/**
 * Generated class for the SeduDenunciasPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-sedu-denuncias',
  templateUrl: 'sedu-denuncias.html',
})
export class SeduDenunciasPage {
  @ViewChild('slides') slides: Slides;

  denuncia: Denuncia = {
    autor: "",
    email: "",
    codigoEdp: "",
    RA: "",
    tipo: 0,
    outroTipo: "",
    descricao: "",
    inepEscola: ""
  };
  municipio: String;
  escola: String;
  
  municipios = [
    "Vitória", "Cariacica", "Serra", "Vila Velha", "Viana", "Guarapari"
  ];
  escolas = [
    "Escola 1",
    "Escola 2",
    "Escola 3",
  ];
  tiposDenuncia = [
    {id: 0, value: "Ônibus não passou"},
    {id: 1, value: "Ônibus atrasou"},
    {id: 2, value: "Ônibus lotado"},
    {id: 3, value: "Ônibus danificado"},
    {id: 4, value: "Outro"}
  ];

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    
  }

  send() {
    console.log("enviando");
  }

  prev() {
    this.slides.slidePrev();
  }

  next() {
    this.slides.slideNext();
  }

}
