import { Component } from '@angular/core';
import { IonicPage } from 'ionic-angular';
import { InAppBrowser } from '@ionic-native/in-app-browser';
import { TeamsApiService } from './providers';
import { Project, TeamMember } from './model';
const packageJson = require('../../../package.json');

/**
 * Generated class for the AboutPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-about',
  templateUrl: 'about.html',
  providers: [TeamsApiService]
})
export class AboutPage {
  teamMembers: TeamMember[];
  project: Project;

  constructor(private iab: InAppBrowser, private teamsApiService: TeamsApiService) {
    this.teamMembers = [];
    this.project = packageJson;
  }

  ionViewWillLoad() {
    this.teamsApiService.getTeamMembers().subscribe((teamMembers: TeamMember[]) => (this.teamMembers = teamMembers));
  }

  /**
   *
   * @param {string} url
   */
  openUrl(url: string): void {
    this.iab.create(url, '_system');
  }
}
