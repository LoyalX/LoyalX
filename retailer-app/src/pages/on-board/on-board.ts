import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, Platform, ViewController, ToastController, Events, LoadingController } from 'ionic-angular';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';

import { RulesEnginePage } from "../rules-engine/rules-engine";
import { LoyalXProvider } from '../../providers/loyalx';
import { UserData } from '../../providers/user-data';

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
		public events: Events,
		public loadingCtrl: LoadingController,
		public userData: UserData,
		public loyalXProvider: LoyalXProvider
	) {

		this.form = formBuilder.group({

			name: ['', Validators.required],
			metaData: formBuilder.group({
				website: ['', Validators.required],
				email: ['', Validators.required],
				logoURL: ['', Validators.required],
				tokenIconURL: ['', Validators.required],
				about: ['', Validators.required]
			}),
			tokenInitialAmount: ['', Validators.required],
			tokenName: ['', Validators.required],
			tokenDecimal: ['', Validators.required],
			tokenSymbol: ['', Validators.required],
		});

		this.form.valueChanges.subscribe(() => {
			this.isReadyToSave = this.form.valid;
		});

	}

	async onCreateTapped() {
		if (!this.form.valid) {
			return;
		};
		this.isReadyToSave = false; // disable the submit button to prevent sending twice
		//	const { name, tokenInitialAmount, tokenName, tokenDecimal, tokenSymbol, ...metaData } = this.form.value;

		let loading = this.loadingCtrl.create({
			content: 'Loading, Please Wait...'
		});
		loading.present();

		try {
			let loyalx = await this.loyalXProvider.getInstance();

			await loyalx.OrganizationFactory.createOrganization(this.form.value);

			this.isReadyToSave = false;
			this.userData.register();
			this.navCtrl.setRoot('TransactionsPage', { isTokensLoading: true });
		}
		catch (err) {
			console.error(err);
		}

		loading.dismiss();
	}

}
