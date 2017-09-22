import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { PointDetailPage } from '../../pages/point-detail/point-detail';

/**
 * Generated class for the PointListPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-point-list',
  templateUrl: 'point-list.html',
})
export class PointListPage {

  companies: Array<any>;
  /*grid: Array<Array<any>>;
  columnsPerRow: number;*/

  constructor(public navCtrl: NavController, public navParams: NavParams) {

    this.companies = [
      { title: "Etisalat", points: 50, imageUrl: "assets/img/Etisalat_Lanka_logo.svg.png" },
      { title: "Vodafone", points: 5000, imageUrl: "assets/img/Vodafone-Logo-png-download.png" },
      { title: "Orange", points: 100, imageUrl: "assets/img/orange-logo.png" },
      { title: "CIB", points: 3000, imageUrl: "assets/img/cib.png" }
    ];

    /*this.companies = [
      "etisalat",
      "vodafone",
      "Mobinil",
      "CIB",
      "title",
      "title",
      "title",
      "title"
    ];*/

    /*this.columnsPerRow = 2;
    this.grid = Array(Math.ceil(this.companies.length / this.columnsPerRow));*/

  }

  onCompanyTapped(company: String) {
    this.navCtrl.push(PointDetailPage, { company: company });
  }

  ionViewDidLoad() {

    /*let rowNum = 0;

    for (let i = 0; i < this.companies.length; i += this.columnsPerRow) {

      this.grid[rowNum] = Array(this.columnsPerRow);

      for (let j = 0; j < this.columnsPerRow; j++) {

        if (this.companies[i + j]) {
          this.grid[rowNum][j] = this.companies[i + j]
        }

      }

      rowNum++;

    }*/

  }

}
