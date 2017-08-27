import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the PointHistoryPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-point-history',
  templateUrl: 'point-history.html',
})
export class PointHistoryPage {
  company: any;
  entries: Array<any>;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.company = this.navParams.get("company");

    this.entries = [
      { points: 50, amount: 25, date: 'Aug 30, 2017' },
      { points: 500, amount: 225, date: 'Aug 29, 2017' },
      { points: 5000, amount: 505, date: 'Aug 28, 2017' },
      { points: 10, amount: 215, date: 'Aug 27, 2017' },
      { points: 1100, amount: 235, date: 'Aug 26, 2017' }
    ]

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PointHistoryPage');
  }

}
