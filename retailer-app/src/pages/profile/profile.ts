import { Component } from '@angular/core';
import { NavController, NavParams, IonicPage } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {

  user = {
    "@context": "http://schema.org",
    "@type": "Person",
    "name": "Agent Smith",
    "address": "23fga3r2hh87ddhq98dhas8dz101j9f449w0",
    "avatar": {
      "uri": "https://ipfs.infura.io/ipfs/QmaqGAeHmwAi44T6ZrSuu3yxwiyHPxoE1rHGmKxeCuZbS7DBX"
    },
    "country": "US",
    "network": "rinkeby",
    "publicEncKey": "dgH1devHn5MhAcph+np8MI4ZLB2kJWqRc4NTwtAj6Fs=",
    "publicKey": "0x04016751595cf2f1429367d6c83a826526g613b4f7574af55ded0364f0fb34600bceba9211e5864ae616d7e83b5e3c79f1c913b40c8d38c64952fef383fd3ad637",
  };

  constructor(public navCtrl: NavController) { }

  getCredentials() {
    console.log("getCredentials method"); // fill u-port here
  }

  requestCredentials() {
    console.log("requestCredentials method"); // fill u-port here
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProfilePage');
  }

}
