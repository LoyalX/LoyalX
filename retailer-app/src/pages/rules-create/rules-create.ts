import { Component } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';

/**
 * Generated class for the RulesCreatePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-rules-create',
  templateUrl: 'rules-create.html',
})
export class RulesCreatePage {

  form: FormGroup;
  isReadyToAdd: boolean;

  activities = [
    {
      name: "Browse"
    },
    {
      name: "Purchase"
    },
    {
      name: "Tweet"
    }
  ];

  constructor(
    public navCtrl: NavController,
    public viewCtrl: ViewController,
    public navParams: NavParams,
    public formBuilder: FormBuilder) {

    this.form = formBuilder.group({
      noOfTransactions: ['', Validators.required],
      points: ['', Validators.required],
      activity: ['', Validators.required]
    });

    this.form.valueChanges.subscribe(() => {
      this.isReadyToAdd = this.form.valid;
    });

  }

  async onAddTapped() {
    if (!this.form.valid) { return; }
    console.log(this.form.value);
    this.viewCtrl.dismiss(this.form.value);
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RulesCreatePage');
  }

}
