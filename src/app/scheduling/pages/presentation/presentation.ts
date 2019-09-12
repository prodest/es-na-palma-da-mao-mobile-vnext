import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';


@IonicPage()
@Component({
  selector: 'page-presentation',
  templateUrl: 'presentation.html',
})
export class PresentationPage {

  menus = [
    {
      buttonTitle: "Agendar Atendimento",
      targetPage: "SchedulingPage"
    },
    {
      buttonTitle: "Consultar Agendamento",
      targetPage: "ConsultSchedulingPage"
    }
  ];

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }


}
