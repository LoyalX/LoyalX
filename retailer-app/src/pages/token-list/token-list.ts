import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Events } from 'ionic-angular';

import { LoyaltyFactoryProvider } from '../../providers/loyalty-factory/loyalty-factory';
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
		public events: Events,
		public loyaltyFactoryProvider: LoyaltyFactoryProvider
	) {
	}

	navigateToPoints(tokenIndex) {
		this.navCtrl.push('PointListPage', { token: this.tokens[tokenIndex], tokenIndex: tokenIndex });
	}

	ionViewWillEnter() {
		// Fire an event to enable back the split plane in this page
		this.events.publish('errorPage:leave');
	}

	async ionViewDidEnter() {
		setTimeout(async () => {
			let tokens = await this.loyaltyFactoryProvider.getTokensByOwner();
			if (this.tokens.length !== tokens.length) {
				this.tokens = tokens;
			}
		}, 4000);
		this.tokens = await this.loyaltyFactoryProvider.getTokensByOwner();
	}

}
