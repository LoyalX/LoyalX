import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Events } from 'ionic-angular';

import LoyalX from 'loyalx-jsapi';
import { LoyalXProvider } from '../../providers/loyalx';

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
		public LoyalXProvider: LoyalXProvider
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
			let tokens = await this.LoyalXProvider.TokenFactory.getTokensByOwner();
			if (this.tokens.length !== tokens.length) {
				this.tokens = tokens;
			}
		}, 4000);
		console.log(this.LoyalXProvider.TokenFactory);
		this.tokens = await this.LoyalXProvider.TokenFactory.getTokensByOwner();
	}

}
