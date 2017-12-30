import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';

/**
 * Generated class for the ProfileEditPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-profile-edit',
  templateUrl: 'profile-edit.html',
})
export class ProfileEditPage {
  user: any;

  form: FormGroup;
  isReadyToEdit: boolean;

  activities = [
    {
      name: "Browse"
    },
    {
      name: "Purchase"
    },
    {
      name: "Tweet"
    },
    {
      name: "Share"
    }
  ];


  constructor(
    public navCtrl: NavController,
    public viewCtrl: ViewController,
    public navParams: NavParams,
    public formBuilder: FormBuilder) {

    this.user = this.navParams.get('user');

    this.form = formBuilder.group({
      name: [this.user.name, Validators.required],
      avatar: [this.user.avatar, Validators.required],
      backgroundImg: [this.user.backgroundImg, Validators.required],
      country: [this.user.country, Validators.required],
      email: [this.user.email, Validators.required],
      website: [this.user.website, Validators.required],
      publicKey: [this.user.publicKey, Validators.required],
      description: [this.user.description, Validators.required]
    });

    this.form.valueChanges.subscribe(() => {
      this.isReadyToEdit = this.form.valid;
    });

  }

  async onAddTapped() {
    if (!this.form.valid) { return; }
    this.viewCtrl.dismiss(this.form.value);
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad ProfileEditPage');
  }

}
