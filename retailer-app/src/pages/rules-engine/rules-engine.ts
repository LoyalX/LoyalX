import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Events, ModalController } from 'ionic-angular';

import { RulesCreatePage } from '../rules-create/rules-create';

import { LoyalXProvider } from '../../providers/loyalx';

/**
 * Generated class for the RulesEnginePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
	selector: 'page-rules-engine',
	templateUrl: 'rules-engine.html',
})
export class RulesEnginePage {
	private _createRulesModal;

	rules = [
		{
			noOfTransactions: 3,
			points: 5,
			activity: "Browse"
		}, {
			noOfTransactions: 1,
			points: 10,
			activity: "Tweet"
		}, {
			noOfTransactions: 1,
			points: 10,
			activity: "Share"
		}
	];

	constructor(public navCtrl: NavController,
		public navParams: NavParams,
		public modalCtrl: ModalController) {
		this._createRulesModal = this.modalCtrl.create(RulesCreatePage);
		this._createRulesModal.onDidDismiss(data => {
			this.rules.push(data);
		});
	}

	openCreateRulesModal() {
		this._createRulesModal.present();
	}

	ionViewDidLoad() {
		console.log('ionViewDidLoad TransactionsPage');
	}

}
