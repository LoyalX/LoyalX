import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';

/**
 * Generated class for the charityModalPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-charity-modal',
  templateUrl: 'charity-modal.html',
})
export class CharityModalPage {
  form: FormGroup;
  isReadyToDonate: boolean;

  tokens = [
    {name: "VOD"},
    {name: "HPY"},
    {name: "ETS"}
  ]

  charity = {
    img: "",
    name: "",
    description: "",
    creator: ""
  };
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public viewCtrl: ViewController,
    public formBuilder: FormBuilder
  ) {
    this.charity = this.navParams.get("charity");
    
    this.form = formBuilder.group({
      numberOfPoints: ['', Validators.required],
      token: ['', Validators.required]
    });

    this.form.valueChanges.subscribe(() => {
      this.isReadyToDonate = this.form.valid;
    });
  }

  onDonateTapped() {
    if (!this.form.valid) { return; }
    this.viewCtrl.dismiss(this.form.value);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad charityModalPage');
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

  install() {
    document.getElementById('test').style.color = 'green';
  }
}
