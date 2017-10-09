import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { LoyaltyFactoryProvider } from '../../providers/loyalty-factory/loyalty-factory';

import { PointListPage } from '../point-list/point-list';

/**
 * Generated class for the TokenListPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
	selector: 'page-token-list',
	templateUrl: 'token-list.html',
})
export class TokenListPage {
	tokens: any;

	constructor(
		public navCtrl: NavController,
		public navParams: NavParams,
		public loyaltyFactoryProvider: LoyaltyFactoryProvider
	) {
	}

	navigateToPoints(token) {
		this.navCtrl.push(PointListPage, { token: token });
	}


	async ionViewDidLoad() {
		this.tokens = await this.loyaltyFactoryProvider.getTokens();
	}

}
