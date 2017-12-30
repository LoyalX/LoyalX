import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Events } from 'ionic-angular';

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
	) {
	}

	navigateToPoints(tokenIndex) {
		this.navCtrl.push('PointTransferPage', { token: this.tokens[tokenIndex], tokenIndex: tokenIndex });
	}

	ionViewWillEnter() {
		// Fire an event to enable back the split plane in this page
		this.events.publish('errorPage:leave');
	}

	async ionViewDidEnter() {
		this.tokens = [
			{
				name: "Vodafone",
				symbol: "VOD",
				balance: 350000,
				logo: 'http://diylogodesigns.com/blog/wp-content/uploads/2016/05/Vodafone-Logo-png-download.png'
			},
			{
				name: "Happiness",
				symbol: "HPY",
				balance: 200000,
				logo: 'http://www.happinesswithirene.com/images/misc/logohappy.png'
			},
			{
				name: "Etisalat",
				symbol: "ETS",
				balance: 100000,
				logo: 'https://upload.wikimedia.org/wikipedia/en/thumb/e/e7/Etisalat_Lanka_logo.svg/871px-Etisalat_Lanka_logo.svg.png'
			}
		];
	}

}
