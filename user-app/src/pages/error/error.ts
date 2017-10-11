import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Events } from 'ionic-angular';

/**
 * Generated class for the ErrorPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
	selector: 'page-error',
	templateUrl: 'error.html',
})
export class ErrorPage {

	constructor(public navCtrl: NavController, public navParams: NavParams, public events: Events) {
	}

	ionViewWillEnter() {
		// Fire an event to disable the split plane in this page
		this.events.publish('errorPage:enter');
	}

	ionViewDidLoad() {
		console.log('ionViewDidLoad ErrorPage');
	}

}
