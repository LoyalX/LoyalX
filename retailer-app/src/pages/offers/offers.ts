import { Component } from '@angular/core';
import { NavController, NavParams, ModalController, Platform, ViewController } from 'ionic-angular';

import { OfferCreatePage } from '../offer-create/offer-create';

import { LoyalXProvider } from '../../providers/loyalx';

/**
 * Generated class for the PointListPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
	selector: 'page-offers',
	templateUrl: 'offers.html',
})
export class OffersPage {
	private _offerCreateModal;

	offers = [
		{
			img: "http://maaakickboxing.net/wp-content/uploads/2016/04/cards-hero-gift.png",
			price: 1000,
			reward: "50$ gift card",
			description: "get a gift card for your loved ones"
		}, {
			img: "http://maaakickboxing.net/wp-content/uploads/2016/04/cards-hero-gift.png",
			price: 2500,
			reward: "100$ gift card",
			description: "get a gift card for your loved ones"
		}, {
			img: "http://maaakickboxing.net/wp-content/uploads/2016/04/cards-hero-gift.png",
			price: 5000,
			reward: "250$ gift card",
			description: "get a gift card for your loved ones"
		}, {
			img: "https://www.clintonsretail.com//media/wysiwyg/christmas-single-cards-50off-GIFFTS.jpg",
			price: 500,
			reward: "50% off",
			description: "get 50% off on any purchase under 100$ ."
		}
	];

	balance: any = 500;

	constructor(
		public navCtrl: NavController,
		public navParams: NavParams,
		public modalCtrl: ModalController,
		public platform: Platform,
		public viewCtrl: ViewController
	) {
		this._offerCreateModal = this.modalCtrl.create(OfferCreatePage);
		this._offerCreateModal.onDidDismiss(data => {
			this.offers.push(data);
		});
	}

	presentOfferCreate() {
		this._offerCreateModal.present();
	}

	async ionViewDidLoad() {
		/*
		this.tokenIndex = this.navParams.get("tokenIndex");
		this.token = this.navParams.get("token");

		if (!this.token && this.tokenIndex) {
			this.tokens = await this.LoyalXProvider.TokenFactory.getTokensByOwner();
			this.token = this.tokens[this.tokenIndex];
		}
		let aToken = new this.LoyalXProvider.Token(this.token.address);
		let tempBalance = (await aToken.getBalance());
		*/
	}

}
