import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, Platform, ViewController } from 'ionic-angular';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';

import { BrandDetailPage } from '../brand-detail/brand-detail';

import { LoyaltyFactoryProvider } from '../../providers/loyalty-factory/loyalty-factory';

import { TokenListPage } from "../token-list/token-list";

/**
 * Generated class for the OnBoardPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
	selector: 'page-on-board',
	templateUrl: 'on-board.html',
})
export class OnBoardPage {

	form: FormGroup;
	isReadyToSave: boolean;

	constructor(public navCtrl: NavController,
		public navParams: NavParams,
		public platform: Platform,
		public modalCtrl: ModalController,
		public viewCtrl: ViewController,
		public formBuilder: FormBuilder,
		public loyaltyFactoryProvider: LoyaltyFactoryProvider) {

		this.form = formBuilder.group({
			retailSymbol: ['', Validators.required],
			retailName: ['', Validators.required],
			retailAmount: ['', Validators.required],
			retailDecimal: ['', Validators.required]
		});

		this.form.valueChanges.subscribe(() => {
			this.isReadyToSave = this.form.valid;
		});

	}

	async onCreateTapped() {
		if (!this.form.valid) {
			return;
		}

		let formValues = this.form.value;
		await this.loyaltyFactoryProvider.handleOnboard(formValues.retailSymbol, formValues.retailName, formValues.retailAmount, formValues.retailDecimal);

		this.navCtrl.setRoot('TokenListPage');
	}

	presentBrandDetail() {
		let BrandDetailModal = this.modalCtrl.create(BrandDetailPage, { brandId: 1 });
		BrandDetailModal.present();
	}

}
