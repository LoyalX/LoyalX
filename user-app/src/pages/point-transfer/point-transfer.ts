import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform, ViewController, ToastController } from 'ionic-angular';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';

import { QRScanner, QRScannerStatus } from '@ionic-native/qr-scanner';

import { LoyaltyTokenProvider } from '../../providers/loyalty-token/loyalty-token';

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

	company: any;
	token: any;
	form: FormGroup;
	isReadyToTransfer: boolean;

	constructor(public navCtrl: NavController, public navParams: NavParams,
		public platform: Platform, public viewCtrl: ViewController, public toastCtrl: ToastController,
		formBuilder: FormBuilder, public loyaltyTokenProvider: LoyaltyTokenProvider, public qrScanner: QRScanner) {

		this.token = this.navParams.get("token");

		this.form = formBuilder.group({
			amount: ['', Validators.required],
			address: ['', Validators.required]
		});

		this.form.valueChanges.subscribe(() => {
			this.isReadyToTransfer = this.form.valid;
		});

	}

	extractAddressFromQRCode() {

		const scanRequestToast = this.toastCtrl.create({
			message: 'Please place the barcode in front of the web cam',
			position: 'middle',
			showCloseButton: true,
			closeButtonText: 'Ok'
		})
		scanRequestToast.present();

		// start scanning
		let scanSub = this.qrScanner.scan().subscribe((text: string) => {

			scanRequestToast.dismiss();

			this.form.controls['address'].setValue(text);

			this.toastCtrl.create({
				message: 'Address token scanned successfully',
				duration: 3000,
				position: 'middle'
			}).present();

			this.qrScanner.destroy(); // cleaning up
			scanSub.unsubscribe(); // stop scanning
		});

		// show camera preview
		this.qrScanner.show();

		// wait for user to scan something, then the observable callback will be called

	}

	async onTransferTapped() {
		if (!this.form.valid) { return; }

		let values = this.form.value;
		values.amount *= Math.pow(10, this.token.decimal);
		
		await this.loyaltyTokenProvider.handleTransfer(values.amount, values.address, this.token.address);
		this.viewCtrl.dismiss(this.form.value);
	}

	dismiss() {
		this.viewCtrl.dismiss();
	}

}
