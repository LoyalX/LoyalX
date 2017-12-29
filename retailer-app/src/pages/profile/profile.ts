import { Component } from '@angular/core';
import { NavController, NavParams, IonicPage } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {
  //https://api.qrserver.com/v1/create-qr-code/?data=0x627306090abaB3A6e1400e9345bC60c78a8BEf57&size=220x220&margin=0
  user = {
    "name": "Vodafone",
    "avatar": "https://www.vcol.co.uk/ds/core/assets/img/vf-logo-2017.png",
    "backgroundImg": "https://www.underconsideration.com/brandnew/archives/vodafone_tagline.png",
    "country": "US",
    "email": "test@test.com",
    "website": "test.com",
    "publicKey": "0x627306090abaB3A6e1400e9345bC60c78a8BEf57",
    "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. In vitae dapibus libero. Fusce ipsum enim, feugiat eu vehicula vel, laoreet non eros. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Sed eget felis nulla. Phasellus metus magna, semper in sollicitudin blandit, lobortis in nisi. Etiam a fermentum massa. Ut vehicula nisl faucibus fringilla sollicitudin. Nunc eu scelerisque nulla."
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
