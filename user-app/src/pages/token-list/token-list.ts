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
		public events: Events
	) {
		this.tokens = [
			{
				name: "IBM",
				symbol: "IBM",
				balance: 350000,
				logo: 'https://logoeps.com/wp-content/uploads/2012/04/ibm-logo-vector.png'
			},
			{
				name: "Happy",
				symbol: "HPY",
				balance: 200000,
				logo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ23BRRC85RbvxoN3qROvfJ0W9eDMCe0mdIU0B8ZDIOpZK0sHvwTg'
			}
		];
	}

	navigateToPoints(tokenIndex) {
		this.navCtrl.push('PointListPage', {
			token: this.tokens[tokenIndex], tokenIndex: tokenIndex, callback: (voucher) => {
				return new Promise((resolve, reject) => {
					this.tokens[tokenIndex].balance -= voucher.points;
					resolve();
				});
			}
		});
	}
	navigateToTransfer(tokenIndex) {
		this.navCtrl.push('PointTransferPage', {
			token: this.tokens[tokenIndex], tokenIndex: tokenIndex
		});
	}

	ionViewWillEnter() {
		// Fire an event to enable back the split plane in this page
		this.events.publish('errorPage:leave');
	}

	async ionViewDidEnter() {
	}

}
