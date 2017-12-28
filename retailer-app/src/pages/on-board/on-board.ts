import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, Platform, ViewController, ToastController } from 'ionic-angular';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';

import { BrandDetailPage } from '../brand-detail/brand-detail';

import LoyalX from 'loyalx-jsapi';

import { TokenListPage } from "../token-list/token-list";
import { LoyalXProvider } from '../../providers/loyalx';

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
		public toastCtrl: ToastController,
		public formBuilder: FormBuilder,
		public LoyalXProvider: LoyalXProvider) {

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
		/*this.isReadyToSave = false; // disable the submit button to prevent sending twice

		let formValues = this.form.value;
		let result = await this.LoyalXProvider.TokenFactory.initialiseRetail(
			formValues.retailSymbol,
			formValues.retailName,
			formValues.retailAmount,
			formValues.retailDecimal
		);

		this.toastCtrl.create({
			message: 'Token created successfully',
			duration: 3000,
			position: 'bottom'
		}).present();

		this.navCtrl.setRoot('TokenListPage', { isTokensLoading: true });*/


		this.LoyalXProvider.loyal.OrganizationFactory.createOrganization({
			name: "name",
			website: "website",
			email: "email",
			logoURL: "logoURL",
			tokenIconURL: "tokenIconURL",
			about: "about",
			tokenInitialAmount: 10000000,
			tokenName: "tokenName",
			tokenDecimal: 2,
			tokenSymbol: "tokenSymbol"
		});

	}

	presentBrandDetail() {
		let BrandDetailModal = this.modalCtrl.create(BrandDetailPage, { brandId: 1 });
		BrandDetailModal.present();
	}

}
