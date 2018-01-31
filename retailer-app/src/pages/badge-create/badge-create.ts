import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform, ViewController } from 'ionic-angular';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';

/**
 * Generated class for the BadgeCreatePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-badge-create',
  templateUrl: 'badge-create.html',
})
export class BadgeCreatePage {

  company: any;

  form: FormGroup;
  isReadyToCreate: boolean;

  constructor(public navCtrl: NavController, public navParams: NavParams, public platform: Platform, public viewCtrl: ViewController, formBuilder: FormBuilder) {

    this.company = this.navParams.get("company");

    /*{
      name: "Helper", metaData: {
        image: "assets/img/badges/helper.png",
          description: 'Being a helper',
            backgroundColor: '#fff',
              fontColor: '#000',
                user: "john Smith",
                  creator: "Happy"
      }
    }*/



    this.form = formBuilder.group({
      name: ['', Validators.required],
      metaData: formBuilder.group({
        image: ['', Validators.required],
        description: ['', Validators.required],
        /*backgroundColor: '#fff',
        fontColor: '#000',
        user: "john Smith",
        creator: "Happy"*/
      }),
    });

    this.form.valueChanges.subscribe(() => {
      this.isReadyToCreate = this.form.valid;
    });

  }

  onCreateTapped() {
    if (!this.form.valid) { return; }
    this.viewCtrl.dismiss(this.form.value);
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

}
