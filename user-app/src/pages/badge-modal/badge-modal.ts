import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';

/**
 * Generated class for the badgeModalPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-badge-modal',
  templateUrl: 'badge-modal.html',
})
export class BadgeModalPage {
  badge = {
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
    this.badge = this.navParams.get("badge");
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad badgeModalPage');
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

  install() {
    document.getElementById('test').style.color = 'green';
  }
}
