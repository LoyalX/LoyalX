import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform, ViewController } from 'ionic-angular';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';

/**
 * Generated class for the OfferCreatePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-offer-create',
  templateUrl: 'offer-create.html',
})
export class OfferCreatePage {

  company: any;

  form: FormGroup;
  isReadyToCreate: boolean;

  constructor(public navCtrl: NavController, public navParams: NavParams, public platform: Platform, public viewCtrl: ViewController, formBuilder: FormBuilder) {

    this.company = this.navParams.get("company");

    this.form = formBuilder.group({
      img: ['', Validators.required],
      price: ['', Validators.required],
      reward: ['', Validators.required],
      description: ['', Validators.required]
    });

    this.form.valueChanges.subscribe(() => {
      this.isReadyToCreate = this.form.valid;
    });

  }

  onCreateTapped() {
    if (!this.form.valid) { return; }
    this.viewCtrl.dismiss(this.form.value);
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

}
