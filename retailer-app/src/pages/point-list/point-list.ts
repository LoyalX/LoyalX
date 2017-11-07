import { Component } from '@angular/core';
import { NavController, NavParams, ModalController, Platform, ViewController } from 'ionic-angular';

import { BrandDetailPage } from '../brand-detail/brand-detail';
import { OfferCreatePage } from '../offer-create/offer-create';

import LoyalX from 'loyalx-jsapi';
import { LoyalXProvider } from '../../providers/loyalx';

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
	features: Array<{ name: string, isChecked: boolean }> = [];

	tokens: any;
	tokenIndex: any;
	token: any;
	balance: any;

	constructor(
		public navCtrl: NavController,
		public navParams: NavParams,
		public modalCtrl: ModalController,
		public platform: Platform,
		public viewCtrl: ViewController,
		public LoyalXProvider: LoyalXProvider
	) {
	}

	presentBrandDetail() {
		let BrandDetailModal = this.modalCtrl.create(BrandDetailPage, { token: this.token });
		BrandDetailModal.present();
	}

	presentOfferCreate() {
		let OfferCreateModal = this.modalCtrl.create(OfferCreatePage, { token: this.token });
		OfferCreateModal.present();
	}

	presentPointTransfer() {
		/*let PointTransferPageModal = this.modalCtrl.create(PointTransferPage, { token: this.token });
		PointTransferPageModal.present();*/

		this.navCtrl.push('PointTransferPage', { token: this.token, tokenIndex: this.tokenIndex });
	}

	async ionViewDidLoad() {
		this.tokenIndex = this.navParams.get("tokenIndex");
		this.token = this.navParams.get("token");

		if (!this.token && this.tokenIndex) {
			this.tokens = await this.LoyalXProvider.get.TokenFactory.getTokensByOwner();
			this.token = this.tokens[this.tokenIndex];
		}
		let aToken = new this.LoyalXProvider.get.Token(this.token.address);
		let tempBalance = (await aToken.getBalance());
		this.balance = tempBalance.dividedBy(Math.pow(10, this.token.decimal)).toString(10);

		this.vouchers = [
			{ price: 25, points: 50 },
			{ price: 50, points: 100 },
			{ price: 100, points: 200 },
			{ price: 25, points: 50 }
		];

		this.features = [
			{ name: "Feature 1", isChecked: false },
			{ name: "Feature 2", isChecked: false },
			{ name: "Feature 3", isChecked: false }
		]

	}

}
