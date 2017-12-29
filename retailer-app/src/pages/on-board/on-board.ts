import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, Platform, ViewController, ToastController } from 'ionic-angular';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';

import { RulesEnginePage } from "../rules-engine/rules-engine";

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
		public formBuilder: FormBuilder) {

		this.form = formBuilder.group({

			name: ['', Validators.required],
			website: ['', Validators.required],
			email: ['', Validators.required],
			logoURL: ['', Validators.required],
			tokenIconURL: ['', Validators.required],
			about: ['', Validators.required],

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
		}
		/*

		this.isReadyToSave = false; // disable the submit button to prevent sending twice

		await this.LoyalXProvider.loyal.OrganizationFactory.createOrganization(this.form.value);
		
		this.toastCtrl.create({
			message: 'Token created successfully',
			duration: 3000,
			position: 'bottom'
		}).present();

		this.navCtrl.setRoot('RulesEnginePage', { isTokensLoading: true });

		*/
	}

}
