import { Component, OnInit } from '@angular/core';
import { IonicPage, NavParams } from 'ionic-angular';

import { PublicWorksDetail } from '../../model';
import { TransparencyApiService } from './../../providers';

@IonicPage()
@Component({
  selector: 'page-public-works-details',
  templateUrl: 'public-works-details.html'
})
export class PublicWorksDetailsPage implements OnInit {
  detail: PublicWorksDetail = undefined;

  /**
   *
   */
  constructor(private navParams: NavParams, private api: TransparencyApiService) {}

  /**
   *
   */
  ngOnInit(): void {
    const id = this.navParams.get('id');
    this.getPublicWorkDetail(id).subscribe(data => (this.detail = data));
  }

  /**
   *
   */
  getPublicWorkDetail(id: number) {
    return this.api.getPublicWorksDetail(id);
  }
}
