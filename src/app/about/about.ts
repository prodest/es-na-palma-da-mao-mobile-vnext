import { Component } from '@angular/core';
import { InAppBrowser } from '@ionic-native/in-app-browser';
import { IonicPage } from 'ionic-angular';

import { Project, TeamMember } from './model';
import { TeamsApiService } from './providers';

const packageJson = require('../../../package.json');

@IonicPage()
@Component({
  selector: 'page-about',
  templateUrl: 'about.html',
  providers: [TeamsApiService]
})
export class AboutPage {
  teamMembers: TeamMember[] = [];
  project: Project = packageJson;

  /**
   *
   */
  constructor(private iab: InAppBrowser, private teamsApiService: TeamsApiService) {}

  /**
   *
   */
  ionViewWillLoad() {
    this.teamsApiService.getTeamMembers().subscribe((teamMembers: TeamMember[]) => (this.teamMembers = teamMembers));
  }

  /**
   *
   */
  openUrl(url: string): void {
    this.iab.create(url, '_system');
  }
}
