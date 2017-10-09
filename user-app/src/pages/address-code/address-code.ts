import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { Web3Provider } from '../../providers/web3/web3';

/**
 * Generated class for the AddressCodePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-address-code',
  templateUrl: 'address-code.html',
})
export class AddressCodePage {

  address: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public web3Provider: Web3Provider) {
  }

  asybc ionViewDidLoad() {
    console.log('ionViewDidLoad AddressCodePage');
    this.address = await this.web3Provider.getAccount();
  }

}
