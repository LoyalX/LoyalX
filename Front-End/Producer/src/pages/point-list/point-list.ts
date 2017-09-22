import { Component } from '@angular/core';
import { NavController, NavParams, ModalController, Platform, ViewController } from 'ionic-angular';

import { BrandDetailPage } from '../brand-detail/brand-detail';
import { OfferCreatePage } from '../offer-create/offer-create';

/**
 * Generated class for the PointListPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-point-list',
  templateUrl: 'point-list.html',
})
export class PointListPage {
  vouchers: Array<{ price: number, points: number }> = [];
  features: Array<{ name: string, isChecked: boolean }> = [];

  constructor(public navCtrl: NavController, public navParams: NavParams, public modalCtrl: ModalController, public platform: Platform, public viewCtrl: ViewController) {
  }

  presentBrandDetail() {
    let BrandDetailModal = this.modalCtrl.create(BrandDetailPage, { brandId: 1 });
    BrandDetailModal.present();
  }

  presentOfferCreate() {
    let OfferCreateModal = this.modalCtrl.create(OfferCreatePage, { brandId: 1 });
    OfferCreateModal.present();
  }



  ionViewDidLoad() {
    this.vouchers = [
      { price: 25, points: 50 },
      { price: 50, points: 100 },
      { price: 100, points: 200 },
      { price: 25, points: 50 },
      { price: 25, points: 50 },
      { price: 25, points: 50 }
    ];

    this.features = [
      {name: "Feature 1", isChecked: false},
      {name: "Feature 2", isChecked: false},
      {name: "Feature 3", isChecked: false},
      {name: "Feature 4", isChecked: false}
    ]
  }

}
