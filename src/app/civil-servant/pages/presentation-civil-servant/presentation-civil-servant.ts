import { Component } from '@angular/core';
import { IonicPage } from 'ionic-angular';


@IonicPage()
@Component({
  selector: 'page-presentation-civil-servant',
  templateUrl: 'presentation-civil-servant.html',
})
export class PresentationCivilServantPage {
  menus = [
    {
      buttonTitle: 'Contracheque',
      targetPage: 'PaystubProfilesPage'
    },
  ];
}
