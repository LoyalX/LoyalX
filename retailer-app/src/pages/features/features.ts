import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { FeatureModalPage } from '../feature-modal/feature-modal';

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
      img: "http://www.businessplusng.com/blog/wp-content/uploads/2016/10/successful-social-media-campaign-featured-1000x530.jpg",
      name: "Social Media Campaign",
      description: "Create a social media campaign that promotes your message. Empowered by AI and Cognitive Services.",
      creator: "Waylon Dalton",
      forCause: true
    }, {
      img: "https://grist.files.wordpress.com/2015/11/shutterstock_64328092-e1472488109710.jpg?w=1024&h=576&crop=1",
      name: "Utility Campaign",
      description: "Campaign to save electricity and water consumption for a greener City.",
      creator: "John Smith",
      forCause: false
    }, {
      img: "https://previews.123rf.com/images/lculig/lculig1507/lculig150701219/42848198-positive-thinking-concept-word-cloud-background-Stock-Photo.jpg",
      name: "Positive Thinker",
      description: "Campaign to promote browsing positive material over the internet.",
      creator: "Marcus Cruz",
      forCause: false
    }
  ];
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public modalCtrl: ModalController
  ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad FeaturesPage');
  }

  presentFeatureModal(feature) {
    let modal = this.modalCtrl.create(FeatureModalPage, { feature: feature });
    modal.present();
  }
}
