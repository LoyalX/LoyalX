import { Component } from '@angular/core';
import { NavController, NavParams, Platform, ViewController } from 'ionic-angular';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';

/**
 * Generated class for the PointSendPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-point-send',
  templateUrl: 'point-send.html',
})
export class PointSendPage {
  company: any;

  form: FormGroup;
  isReadyToSend: boolean;

  constructor(public navCtrl: NavController, public navParams: NavParams, public platform: Platform, public viewCtrl: ViewController, formBuilder: FormBuilder) {

    this.company = this.navParams.get("company");

    this.form = formBuilder.group({
      receiverKey: ['', Validators.required],
      price: ['', Validators.required],
      textField: ['', Validators.required]
    });

    this.form.valueChanges.subscribe((v) => {
      this.isReadyToSend = this.form.valid;
    });

  }


  onSendTapped() {
    if (!this.form.valid) { return; }
    this.viewCtrl.dismiss(this.form.value);
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PointSendPage');
  }

}
