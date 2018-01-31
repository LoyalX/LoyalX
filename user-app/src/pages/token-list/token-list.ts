import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Events, LoadingController } from 'ionic-angular';

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
		public loadingCtrl: LoadingController,
		public loyalXProvider: LoyalXProvider
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

	async ionViewDidLoad() {
		let loading = this.loadingCtrl.create({
			content: 'Loading, Please Wait...'
		});
		loading.present();
		
		let loyalx = await this.loyalXProvider.getInstance();

		let organizations = await loyalx.OrganizationFactory.getOrganizations();
		for (const key in organizations) {

			let organization = organizations[key];
			organizations[key] = { ...organizations[key], ...await organizations[key].getAttribs() };

			let rewardProgram = organizations[key].rewardProgram
			organizations[key].rewardProgram = { ...organizations[key].rewardProgram, ...await organizations[key].rewardProgram.getAttribs() };
			organizations[key].rewardProgram = { ...organizations[key].rewardProgram, ...organizations[key].rewardProgram.metaData};

			let tempBalance = await rewardProgram.balanceOf("0xf17f52151EbEF6C7334FAD080c5704D77216b732");
			organizations[key].balance = tempBalance.dividedBy(Math.pow(10, organizations[key].rewardProgram.decimal)).toString(10);
		};
		loading.dismiss();
		this.tokens = organizations;
	}

}
