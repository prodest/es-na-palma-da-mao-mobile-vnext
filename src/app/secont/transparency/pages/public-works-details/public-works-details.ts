import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { TransparencyApiService } from './../../providers';
import { PublicWorksDetail } from '../../model';

/**
 * Generated class for the PublicWorksDetailsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-public-works-details',
  templateUrl: 'public-works-details.html',
  providers: [TransparencyApiService]
})
export class PublicWorksDetailsPage implements OnInit {
  public detail: PublicWorksDetail = undefined;

  constructor(public navCtrl: NavController, public navParams: NavParams, private api: TransparencyApiService) {}

  ngOnInit(): void {
    const id = this.navParams.get('id');
    this.getPublicWorkDetail(id).subscribe(data => (this.detail = data));
  }

  getPublicWorkDetail(id: number) {
    return this.api.getPublicWorksDetail(id);
  }
}
