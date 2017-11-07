import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform, ViewController, ToastController } from 'ionic-angular';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';

import { QRScanner, QRScannerStatus } from '@ionic-native/qr-scanner';

import LoyalX from 'loyalx-jsapi';
import { LoyalXProvider } from '../../providers/loyalx';

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
	tokens: any;
	tokenIndex: any;
	token: any;
	form: FormGroup;
	scannerStatus: QRScannerStatus;
	isReadyToTransfer: boolean;

	constructor(
		public navCtrl: NavController,
		public navParams: NavParams,
		public platform: Platform,
		public viewCtrl: ViewController,
		public toastCtrl: ToastController,
		public formBuilder: FormBuilder,
		public qrScanner: QRScanner,
		public LoyalXProvider: LoyalXProvider
	) {

		this.token = this.navParams.get("token");

		this.form = formBuilder.group({
			amount: ['', Validators.required],
			address: ['', Validators.required]
		});

		this.form.valueChanges.subscribe(() => {
			this.isReadyToTransfer = this.form.valid;
		});

		this.qrScanner.getStatus().then(status => this.scannerStatus = status);

	}

	extractAddressFromQRCode() {

		const scanRequestToast = this.toastCtrl.create({
			message: 'Please place the barcode in front of the cam',
			duration: 3000,
			position: 'middle'
		})
		scanRequestToast.present();

		// start scanning
		let scanSub = this.qrScanner.scan().subscribe((text: string) => {
			// wait for user to scan something, then the observable callback will be called

			scanRequestToast.dismiss();

			this.form.controls['address'].setValue(text);

			this.toastCtrl.create({
				message: 'Address token scanned successfully',
				duration: 3000,
				position: 'middle'
			}).present();

			/* cleaing up */
			this.qrScanner.pausePreview();
			this.qrScanner.hide();
			this.qrScanner.destroy();
			/* cleaing up */

			scanSub.unsubscribe(); // stop scanning

			this.qrScanner.getStatus().then(status => this.scannerStatus = status);
		});

		// Make the webview transparent so the video preview is visible behind it.
		this.qrScanner.show().then(status => this.scannerStatus = status);

		// Make any opaque HTML elements transparent here to avoid covering the video.
		window.document.querySelector('ion-content').classList.add('transparent-background');

	}

	async ionViewDidLoad() {
		this.tokenIndex = this.navParams.get("tokenIndex");
		this.token = this.navParams.get("token");

		if (!this.token && this.tokenIndex) {
			this.tokens = await this.LoyalXProvider.TokenFactory.getTokensByOwner();
			this.token = this.tokens[this.tokenIndex];
		}
	}

	isReadyToShowScanRec() {
		return this.scannerStatus.showing;
	}

	async onTransferTapped() {
		if (!this.form.valid) { return; }

		let values = this.form.value;
		values.amount *= Math.pow(10, this.token.decimal);
		let aToken = new this.LoyalXProvider.Token(this.token.address);
		await aToken.transfer(values.amount, values.address);
		this.viewCtrl.dismiss(this.form.value);
	}

	dismiss() {
		this.viewCtrl.dismiss();
	}

}
