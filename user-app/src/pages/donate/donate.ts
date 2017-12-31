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
      img: "https://d26a57ydsghvgx.cloudfront.net/product/images/customers/charity_water_pouring.jpg",
      name: "Clean Water",
      description: "water’s mission is to bring clean and safe drinking water to every person in the world. Part of that mission is to deliver the best possible customer experience to every charity: water supporter.",
      creator: "charity-water"
    }, {
      img: "https://www.directrelief.org/content/uploads/Aid-map-Direct-Relief-600x316.png",
      name: "Direct Relief",
      description: "Direct Relief is a nonprofit, nonpartisan organization with a stated mission to “improve the health and lives of people affected by poverty or emergency situations by mobilizing and providing essential medical resources needed for their care.",
      creator: "charity-water"
    }, {
      img: "http://lakeshoreopen.com/wp-content/images/banner-make-a-wish.jpg",
      name: "Make-A-Wish Foundation",
      description: "The Make-A-Wish Foundation is a 501 non-profit organization that arranges experiences described as wishes to children with life-threatening medical conditions.",
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
