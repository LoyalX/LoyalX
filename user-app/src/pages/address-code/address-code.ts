import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

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

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  async ionViewDidLoad() {
    console.log('ionViewDidLoad AddressCodePage');
    this.address =  "0x627306090abaB3A6e1400e9345bC60c78a8BEf57" // await this.web3Provider.getAccount()
  }

}
