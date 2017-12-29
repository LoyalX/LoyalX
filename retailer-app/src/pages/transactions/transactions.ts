import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the TransactionsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-transactions',
  templateUrl: 'transactions.html',
})
export class TransactionsPage {

  balance = 500000;
  transactions = [
    {
      from: "0x627306090abaB3A6e1400e9345bC60c78a8BEf57",
      to: "0x627306090abaB3A6e1400e9345bC60c78a8BEf57",
      amount: "500",
      time: new Date()
    }, {
      from: "0x627306090abaB3A6e1400e9345bC60c78a8BEf57",
      to: "0x627306090abaB3A6e1400e9345bC60c78a8BEf57",
      amount: "500",
      time: new Date()
    }, {
      from: "0x627306090abaB3A6e1400e9345bC60c78a8BEf57",
      to: "0x627306090abaB3A6e1400e9345bC60c78a8BEf57",
      amount: "500",
      time: new Date()
    }
  ];

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TransactionsPage');
  }
  
	presentPointTransfer() {
		/*let PointTransferPageModal = this.modalCtrl.create(PointTransferPage, { token: this.token });
		PointTransferPageModal.present();*/

		this.navCtrl.push('PointTransferPage');
	}
}
