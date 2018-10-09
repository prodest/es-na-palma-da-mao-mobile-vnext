import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';


@IonicPage()
@Component({
  selector: 'page-search',
  templateUrl: 'search.html',
})
export class SearchPage {
  
  items:Array<{value:string,description:string}>;
  filter:string;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.items = [
      {value:"nome_concurso",description:"nome do concurso"},
      {value:"profissao",description:"profissão"},
      {value:"data",description:"data do concurso"}
    ]
  }
  proximo(){
    this.navCtrl.push('ListResultPage');
  }
}
