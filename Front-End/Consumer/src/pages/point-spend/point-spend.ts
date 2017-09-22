import { Component } from '@angular/core';
import { NavController, NavParams, Platform, ViewController } from 'ionic-angular';

/**
 * Generated class for the PointSpendPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-point-spend',
  templateUrl: 'point-spend.html',
})
export class PointSpendPage {
  company: any;
  vouchers: Array<any>;
  selectedCard: Number;

  constructor(public navCtrl: NavController, public navParams: NavParams, public platform: Platform, public viewCtrl: ViewController) {
    this.company = this.navParams.get("company");
    this.vouchers = [
      { price: 25, points: 50 },
      { price: 50, points: 100 },
      { price: 100, points: 200 },
      { price: 25, points: 50 },
      { price: 25, points: 50 },
      { price: 25, points: 50 },
      { price: 25, points: 50 },
      { price: 25, points: 50 },
      { price: 25, points: 50 }
    ]
  }

  checkSelection(index) {
    return index === this.selectedCard;
  }

  onVoucherCardTapped(index) {
    this.selectedCard = index;
  }

  isRedeemDisabled() {
    return (this.selectedCard != 0 && !this.selectedCard);
  }

  onRedeemTapped() {
    this.dismiss();
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PointSpendPage');
  }

}
