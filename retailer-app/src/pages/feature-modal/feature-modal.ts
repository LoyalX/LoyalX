import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';

/**
 * Generated class for the FeatureModalPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-feature-modal',
  templateUrl: 'feature-modal.html',
})
export class FeatureModalPage {
  feature = {
    img: "",
    name: "",
    description: "",
    creator: ""
  };
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public viewCtrl: ViewController
  ) {
    this.feature = this.navParams.get("feature");
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad FeatureModalPage');
  }
  dismiss() {
    this.viewCtrl.dismiss();
  }
}
