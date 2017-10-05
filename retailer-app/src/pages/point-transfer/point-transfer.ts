import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform, ViewController } from 'ionic-angular';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';

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

	form: FormGroup;
	isReadyToTransfer: boolean;

	constructor(public navCtrl: NavController, public navParams: NavParams,
		public platform: Platform, public viewCtrl: ViewController, formBuilder: FormBuilder, public loyaltyTokenProvider: LoyaltyTokenProvider) {

		this.form = formBuilder.group({
			amount: ['', Validators.required],
			address: ['', Validators.required]
		});

		this.form.valueChanges.subscribe(() => {
			this.isReadyToTransfer = this.form.valid;
		});

	}

	extractAddressFromQRCode() {
		this.form.controls['address'].setValue('0xca6bce95c969c75898770b6059423a187cbc5d10');
	}

	async onTransferTapped() {
		if (!this.form.valid) { return; }

		let values = this.form.value;
		await this.loyaltyTokenProvider.handleTransfer(values.amount, values.address);
		this.viewCtrl.dismiss(this.form.value);
	}

	dismiss() {
		this.viewCtrl.dismiss();
	}

}
