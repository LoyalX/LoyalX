import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';

/**
 * Generated class for the offerModalPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-offer-modal',
  templateUrl: 'offer-modal.html',
})
export class OfferModalPage {

  offer = {
    img: "",
    price: '',
    reward: '',
    description: '',
    isActivated: false
  };

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public viewCtrl: ViewController
  ) {
    this.offer = this.navParams.get("offer");
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad offerModalPage');
  }

  onActivateClicked() {
    this.offer.isActivated = true;
    this.viewCtrl.dismiss(this.offer);
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

  install() {
    document.getElementById('test').style.color = 'green';
  }
}
