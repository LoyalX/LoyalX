import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform, ViewController, ToastController } from 'ionic-angular';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';

import { LoyalXProvider } from '../../providers/loyalx';

//import { QRScanner, QRScannerStatus } from '@ionic-native/qr-scanner';

/**
 * Generated class for the PointTransferPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
	selector: 'page-point-transfer',
	templateUrl: 'point-transfer.html',
})
export class PointTransferPage {
	loyaltyFactoryProvider: any;
	tokens: any;
	tokenIndex: any;
	token: any;
	form: FormGroup;
	//scannerStatus: QRScannerStatus;
	showForm: boolean;
	isReadyToTransfer: boolean;

	constructor(
		public navCtrl: NavController,
		public navParams: NavParams,
		public platform: Platform,
		public viewCtrl: ViewController,
		public toastCtrl: ToastController,
		public formBuilder: FormBuilder,
		//public qrScanner: QRScanner,
		public loyalXProvider: LoyalXProvider
	) {

		this.token = this.navParams.get("token");

		this.form = formBuilder.group({
			amount: ['', Validators.required],
			address: ['', Validators.required]
		});

		this.form.valueChanges.subscribe(() => {
			this.isReadyToTransfer = this.form.valid;
		});

		//this.qrScanner.getStatus().then(status => this.scannerStatus = status);

	}

	extractAddressFromQRCode() {

		const scanRequestToast = this.toastCtrl.create({
			message: 'Please place the barcode in front of the cam',
			duration: 3000,
			position: 'middle'
		})
		// scanRequestToast.present();

		this.form.setValue({
			amount: null,
			address: '0x627306090abaB3A6e1400e9345bC60c78a8BEf57'
		});

		// start scanning
		/* let scanSub = this.qrScanner.scan().subscribe((text: string) => {
			// wait for user to scan something, then the observable callback will be called

			scanRequestToast.dismiss();

			this.form.controls['address'].setValue(text);

			this.toastCtrl.create({
				message: 'Address token scanned successfully',
				duration: 3000,
				position: 'middle'
			}).present();
			
			this.qrScanner.pausePreview();
			this.qrScanner.hide();
			this.qrScanner.destroy();

			scanSub.unsubscribe(); // stop scanning

			this.qrScanner.getStatus().then(status => this.scannerStatus = status);
		}); */

		// Make the webview transparent so the video preview is visible behind it.
		// this.qrScanner.show().then(status => this.scannerStatus = status);

		// Make any opaque HTML elements transparent here to avoid covering the video.
		window.document.querySelector('ion-content').classList.add('transparent-background');

	}

	async ionViewDidLoad() {
		this.tokenIndex = this.navParams.get("tokenIndex");
		this.token = this.navParams.get("token");

		if (!this.token && this.tokenIndex) {
			this.tokens = [] || await this.loyaltyFactoryProvider.getTokens();
			this.token = this.tokens[this.tokenIndex];
		}
	}

	isReadyToShowScanRec() {
		return true // this.scannerStatus.showing;
	}

	async onTransferTapped() {
		if (!this.form.valid) { return; }

		let loyalx = await this.loyalXProvider.getInstance();

		let organization = await loyalx.OrganizationFactory.findOrganizationByOwner();
		let organizationAtts = await organization.getAttribs();

		let rewardProgram = organizationAtts.rewardProgram;
		let rewardProgramAtts = await rewardProgram.getAttribs();

		let values = this.form.value;
		values.amount *= Math.pow(10, rewardProgramAtts.decimal);
		try {
			await rewardProgram.transfer(values.amount, values.address);
		}
		catch (err) {
			console.warn(err);
		}

		this.toastCtrl.create({
			message: 'Token transferred successfully',
			duration: 3000,
			position: 'middle'
		}).present();

		this.form.reset();
		this.showForm = false;
		this.dismiss();
	}

	dismiss() {
		this.viewCtrl.dismiss();
	}

}
