import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, LoadingController } from 'ionic-angular';
import { BadgeModalPage } from '../badge-modal/badge-modal';
import { LoyalXProvider } from '../../providers/loyalx';

/**
 * Generated class for the BadgeListPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

enum BadgeSegmentChoice {
  AllBadges = "All Badges",
  earnedBadges = "Earned Badges"
}

@IonicPage()
@Component({
  selector: 'page-badge-list',
  templateUrl: 'badge-list.html',
})
export class BadgeListPage {
  public BadgeSegmentChoice = BadgeSegmentChoice;
  public selectedBadges: string = BadgeSegmentChoice.AllBadges;
  public organizations = [];
  /*public badges = [
    {
      image: "assets/img/badges/inspiration-40x40.png", // should be 40x40
      title: 'Clean Energy',
      description: 'Being energy concern',
      backgroundColor: '#fff', // optional, default is #fff.
      fontColor: '#000', // optional, default is #000.
      user: "john Smith",
      creator: "Happy"
    }, {
      image: "assets/img/badges/cypress-40x40.png",
      title: 'Environment Saver',
      description: 'Being environment saver',
      user: "john Smith",
      creator: "Happy"
    }, {
      image: "assets/img/badges/helper.png",
      title: 'Helper',
      description: 'Being a helper for peopler',
      user: "john Smith",
      creator: "Happy"
    }
  ]*/

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public modalCtrl: ModalController,
    public loadingCtrl: LoadingController,
    public loyalXProvider: LoyalXProvider
  ) {
  }

  async ionViewDidLoad() {
    let loading = this.loadingCtrl.create({
      content: 'Loading, Please Wait...'
    });
    loading.present();

    let loyalx = await this.loyalXProvider.getInstance();
    let organizations = await loyalx.OrganizationFactory.getOrganizations();

    for (const organizationKey in organizations) {
      organizations[organizationKey] = { ...organizations[organizationKey], ...await organizations[organizationKey].getAttribs() };
      organizations[organizationKey].badgeProgram.badges = (await organizations[organizationKey].badgeProgram.getBadges());
      organizations[organizationKey].badgeProgram.issuedBadges = (await organizations[organizationKey].badgeProgram.getIssuedBadges("0xf17f52151EbEF6C7334FAD080c5704D77216b732"));

      let badgeProgram = organizations[organizationKey].badgeProgram, i = 0, j = 0;
      while (i < badgeProgram.badges.length || j < badgeProgram.issuedBadges.length) {
        if (badgeProgram.badges[i]) badgeProgram.badges[i] = { ...badgeProgram.badges[i], ...await badgeProgram.badges[i].getAttribs() };
        if (badgeProgram.issuedBadges[j]) badgeProgram.issuedBadges[j] = { ...badgeProgram.issuedBadges[j], ...await badgeProgram.issuedBadges[j].getAttribs() };
        i++;
        j++;
      }

      /*let badgeProgram = organizations[organizationKey].badgeProgram;
      for (const badgeKey in badgeProgram.badges) {
        badgeProgram.badges[badgeKey].isIssued = (badgeProgram.issuedBadges.some(issueBadge => badgeProgram.badges[badgeKey].address === issueBadge.address));
        badgeProgram.badges[badgeKey] = { ...badgeProgram.badges[badgeKey], ...await badgeProgram.badges[badgeKey].getAttribs() };
      }*/
    };
    loading.dismiss();
    this.organizations = organizations;
  }

  presentBadgeModal(badge, organization) {
    let modal = this.modalCtrl.create(BadgeModalPage, { badge: badge, organization: organization});
    modal.present();
  }
}
