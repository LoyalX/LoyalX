import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform, ViewController } from 'ionic-angular';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';

/**
 * Generated class for the BrandDetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-brand-detail',
  templateUrl: 'brand-detail.html',
})
export class BrandDetailPage {

  company: any;

  form: FormGroup;
  isReadyToSave: boolean;

  constructor(public navCtrl: NavController, public navParams: NavParams, public platform: Platform, public viewCtrl: ViewController, formBuilder: FormBuilder) {

    this.company = this.navParams.get("company");

    this.form = formBuilder.group({
      brandName: ['', Validators.required],
      brandLogo: ['', Validators.required],
      numberOfEmployees: ['', Validators.required]
    });

    this.form.valueChanges.subscribe(() => {
      this.isReadyToSave = this.form.valid;
    });

  }

  onSaveTapped() {
    if (!this.form.valid) { return; }
    this.viewCtrl.dismiss(this.form.value);
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

}
