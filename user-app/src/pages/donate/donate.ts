import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { ModalController } from 'ionic-angular/components/modal/modal-controller';
import { CharityModalPage } from '../charity-modal/charity-modal';

/**
 * Generated class for the DonatePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-donate',
  templateUrl: 'donate.html',
})
export class DonatePage {
  private _CharityModal;

  charities = [
    {
      img: "https://www.projectlinus.org/images/image-2.jpg",
      name: "Buy one blanket, donate one",
      description: "At Project Linus, a non-profit organization, we provide homemade blankets to children in need. Our blankets are lovingly made by adults.",
      creator: "projectlinus"
    }, {
      img: "https://d26a57ydsghvgx.cloudfront.net/product/images/customers/charity_water_pouring.jpg",
      name: "Clean Water",
      description: "water’s mission is to bring clean and safe drinking water to every person in the world. Part of that mission is to deliver the best possible customer experience to every charity: water supporter.",
      creator: "charity-water"
    }, {
      img: "https://d26a57ydsghvgx.cloudfront.net/product/images/customers/charity_water_pouring.jpg",
      name: "Clean Water",
      description: "water’s mission is to bring clean and safe drinking water to every person in the world. Part of that mission is to deliver the best possible customer experience to every charity: water supporter.",
      creator: "charity-water"
    }
  ];

  constructor(public navCtrl: NavController, public navParams: NavParams, public modalCtrl: ModalController, private toastCtrl: ToastController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DonatePage');
  }

  presentCharityModal(charity) {
    let modal = this.modalCtrl.create(CharityModalPage, { charity: charity });

    modal.onDidDismiss(data => {
      if (data) {
        this.toastCtrl.create({
          message: `${data.numberOfPoints} ${data.token} was donated successfully`,
          duration: 3000,
          position: 'bottom'
        }).present()
      }
    })

    modal.present();
  }

}
