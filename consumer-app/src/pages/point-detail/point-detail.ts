import { Component } from '@angular/core';
import { NavController, NavParams, ModalController } from 'ionic-angular';

import { PointHistoryPage } from '../point-history/point-history';
import { PointSendPage } from "../point-send/point-send";
import { PointSpendPage } from "../point-spend/point-spend";


/**
 * Generated class for the PointDetailPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-point-detail',
  templateUrl: 'point-detail.html',
})
export class PointDetailPage {
  company: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public modalCtrl: ModalController) {
    this.company = this.navParams.get("company");
  }

  onHistoryTapped() {
    this.navCtrl.push(PointHistoryPage, { company: this.company });
  }

  onSendPointsTapped() {
    let sendPointModal = this.modalCtrl.create(PointSendPage, { company: this.company });

    sendPointModal.onDidDismiss(data => {
      console.log(data);
    });

    sendPointModal.present();
  }

  onSpendPointsTapped() {
    let spendPointModal = this.modalCtrl.create(PointSpendPage, { company: this.company });

    spendPointModal.onDidDismiss(data => {
      console.log(data);
    });

    spendPointModal.present();
  }


  ionViewDidLoad() {
    console.log('ionViewDidLoad PointDetailPage');
  }

}
