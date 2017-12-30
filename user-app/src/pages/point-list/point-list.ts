import { Component } from '@angular/core';
import { NavController, NavParams, ModalController, Platform, ViewController } from 'ionic-angular';

import { OfferCreatePage } from '../offer-create/offer-create';
import { PointTransferPage } from '../point-transfer/point-transfer';

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
	vouchers: Array<{ price: number, points: number }> = [];

	tokens: any;
	tokenIndex: any;
	token: any;
	balance: any;

	constructor(public navCtrl: NavController, public navParams: NavParams, public modalCtrl: ModalController,
		public platform: Platform, public viewCtrl: ViewController) {
		this.token = this.navParams.get("token");
	}

	presentOfferCreate() {
		let OfferCreateModal = this.modalCtrl.create(OfferCreatePage, { brandId: 1 });
		OfferCreateModal.present();
	}

	presentPointTransfer() {
		/*let PointTransferPageModal = this.modalCtrl.create(PointTransferPage, { token: this.token });
		PointTransferPageModal.present();*/

		this.navCtrl.push('PointTransferPage',  { token: this.token, tokenIndex: this.tokenIndex });
	}



	async ionViewDidLoad() {
		this.tokenIndex = this.navParams.get("tokenIndex");
		//this.token = this.navParams.get("token");

		this.tokens = [
			{
				name: "Vodafone",
				symbol: "VOD",
				balance: 350000,
				logo: 'http://diylogodesigns.com/blog/wp-content/uploads/2016/05/Vodafone-Logo-png-download.png'
			},
			{
				name: "happiness",
				symbol: "HPY",
				balance: 200000,
				logo: 'http://www.happinesswithirene.com/images/misc/logohappy.png'
			},
			{
				name: "etisalat",
				symbol: "ETS",
				balance: 100000,
				logo: 'https://upload.wikimedia.org/wikipedia/en/thumb/e/e7/Etisalat_Lanka_logo.svg/871px-Etisalat_Lanka_logo.svg.png'
			}
		];

		if(!this.token && this.tokenIndex) {
		//	this.tokens = []
			this.token = this.tokens[this.tokenIndex];
		}

		//let tempBalance = (await this.loyaltyTokenProvider.getBalance(this.token.address));
		this.balance = this.token.balance // tempBalance.dividedBy(Math.pow(10, this.token.decimal)).toString(10);

		this.vouchers = [
			{ price: 25, points: 50 },
			{ price: 50, points: 100 },
			{ price: 100, points: 200 },
			{ price: 25, points: 50 }
		];

	}

}
