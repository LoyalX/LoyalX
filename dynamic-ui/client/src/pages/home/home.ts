import { Component } from '@angular/core';
import { NavController, Refresher } from 'ionic-angular';
import { HttpClient } from '@angular/common/http';
import { InAppBrowser } from '@ionic-native/in-app-browser';

import CONFIG from '../../app/app.config';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  apps: any;

  constructor(public navCtrl: NavController, private http: HttpClient, private iab: InAppBrowser) {

  }

  doRefresh(refresher: Refresher) {
    this.http.get(`${CONFIG.API_URL}/apps`).subscribe(apps => {
      this.apps = apps;
      refresher.complete();
    });
  }

  appSelected(app) {
    this.iab.create(`${CONFIG.API_URL}/${app}`, '_self', 'location=no, toolbar=no');
  }

  ionViewDidLoad() {
    this.http.get(`${CONFIG.API_URL}/apps`).subscribe(apps => {
      this.apps = apps;
    });
  }

}
