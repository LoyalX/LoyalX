import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the FeaturesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-features',
  templateUrl: 'features.html',
})
export class FeaturesPage {

  features = [
    {
      img: "http://www.videoplayerhtml5.com/wp-content/uploads/2017/09/top-3-sticky-html5-radio-player-plugins-img.jpg",
      name: "Social Media Campaign",
      description: "Create a social media campaign that promotes your message. Empowered by AI and Cognitive Services.",
      creator: "John Smith"
    }, {
      img: "http://www.videoplayerhtml5.com/wp-content/uploads/2017/09/top-3-sticky-html5-radio-player-plugins-img.jpg",
      name: "Social Media Campaign",
      description: "Create a social media campaign that promotes your message. Empowered by AI and Cognitive Services.",
      creator: "John Smith"
    }
    , {
      img: "http://www.videoplayerhtml5.com/wp-content/uploads/2017/09/top-3-sticky-html5-radio-player-plugins-img.jpg",
      name: "Social Media Campaign",
      description: "Create a social media campaign that promotes your message. Empowered by AI and Cognitive Services.",
      creator: "John Smith"
    }, {
      img: "http://www.videoplayerhtml5.com/wp-content/uploads/2017/09/top-3-sticky-html5-radio-player-plugins-img.jpg",
      name: "Social Media Campaign",
      description: "Create a social media campaign that promotes your message. Empowered by AI and Cognitive Services.",
      creator: "John Smith"
    }, {
      img: "http://www.videoplayerhtml5.com/wp-content/uploads/2017/09/top-3-sticky-html5-radio-player-plugins-img.jpg",
      name: "Social Media Campaign",
      description: "Create a social media campaign that promotes your message. Empowered by AI and Cognitive Services.",
      creator: "John Smith"
    }
  ];
  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad FeaturesPage');
  }

}
