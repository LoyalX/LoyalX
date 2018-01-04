import { Component } from '@angular/core';
import { NavController, NavParams, IonicPage, ModalController } from 'ionic-angular';
import { ProfileEditPage } from '../profile-edit/profile-edit';

@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {
  private _profileEditModal;

  //https://api.qrserver.com/v1/create-qr-code/?data=0x627306090abaB3A6e1400e9345bC60c78a8BEf57&size=220x220&margin=0
  user = {
    "name": "Happy",
    "avatar": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ23BRRC85RbvxoN3qROvfJ0W9eDMCe0mdIU0B8ZDIOpZK0sHvwTg",
    "backgroundImg": "https://www.happy.ae/images/default-source/home/why-image.jpg?Status=Temp&sfvrsn=2",
    "country": "UAE",
    "email": "support@happy.ae",
    "website": "https://www.happy.ae",
    "publicKey": "0x627306090abaB3A6e1400e9345bC60c78a8BEf57",
    "description": "Happiness and positivity are a lifestyle and government’s commitment and a true spirit that unites the Emirati community."
  };

  constructor(public navCtrl: NavController, public modalCtrl: ModalController) {
    this._profileEditModal = this.modalCtrl.create(ProfileEditPage, { "user": this.user });
    this._profileEditModal.onDidDismiss(data => {
      this.user = { ...this.user, ...data };
    });
  }

  getCredentials() {
    console.log("getCredentials method"); // fill u-port here
  }

  requestCredentials() {
    console.log("requestCredentials method"); // fill u-port here
  }

  openProfileEditModal() {
    this._profileEditModal.present();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProfilePage');
  }

}
