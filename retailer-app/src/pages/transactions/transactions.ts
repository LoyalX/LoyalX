import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';

import { LoyalXProvider } from '../../providers/loyalx';
import { BigNumber } from 'bignumber.js';


/**
 * Generated class for the TransactionsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-transactions',
  templateUrl: 'transactions.html',
})
export class TransactionsPage {
  name = "Happy";
  symbol = "HPY";
  pointsInCirculation = 500500;
  balance = 500000;
  transactions = [
    {
      args: {
        from: "0x627306090abaB3A6e1400e9345bC60c78a8BEf57",
        to: "0x627306090abaB3A6e1400e9345bC60c78a8BEf57",
        value: new BigNumber(500)
      },
      time: new Date()
    }, {
      args: {
        from: "0x627306090abaB3A6e1400e9345bC60c78a8BEf57",
        to: "0x627306090abaB3A6e1400e9345bC60c78a8BEf57",
        value: new BigNumber(500)
      },
      time: new Date()
    }, {
      args: {
        from: "0x627306090abaB3A6e1400e9345bC60c78a8BEf57",
        to: "0x627306090abaB3A6e1400e9345bC60c78a8BEf57",
        value: new BigNumber(500)
      },
      time: new Date()
    }
  ];

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public loyalXProvider: LoyalXProvider,
    public loadingCtrl: LoadingController) {
  }

  async ionViewDidLoad() {
    console.log('ionViewDidLoad TransactionsPage');

    let loading = this.loadingCtrl.create({
      content: 'Loading, Please Wait...'
    });
    loading.present();
    try {
      let loyalx = await this.loyalXProvider.getInstance();

      let organization = await loyalx.OrganizationFactory.findOrganizationByOwner();
      let organizationAtts = await organization.getAttribs();

      /*await organizationAtts.badgeProgram.add({
        name: "Clean Energy", metaData: {
          image: "assets/img/badges/inspiration-40x40.png",
          description: 'Being energy concern',
          backgroundColor: '#fff',
          fontColor: '#000',
          user: "john Smith",
          creator: "Happy"
        }
      });*/

      // await organizationAtts.badgeProgram.issue(0, "0xf17f52151EbEF6C7334FAD080c5704D77216b732");

      /*await organizationAtts.badgeProgram.add({
        name: "Helper", metaData: {
          image: "assets/img/badges/helper.png",
          description: 'Being a helper',
          backgroundColor: '#fff',
          fontColor: '#000',
          user: "john Smith",
          creator: "Happy"
        }
      });*/

      let rewardProgram = organizationAtts.rewardProgram;
      let rewardProgramAtts = await rewardProgram.getAttribs();

      this.transactions = await rewardProgram.getTransactions();
      this.transactions.map(tr => tr.args.value = tr.args.value.dividedBy(Math.pow(10, rewardProgramAtts.decimal)))

      let tempBalance = await rewardProgram.balanceOf();

      this.balance = tempBalance.dividedBy(Math.pow(10, rewardProgramAtts.decimal)).toString(10);

    }
    catch (err) {
      console.error(err);
      return false;
    }
    loading.dismiss();
  }

  presentPointTransfer() {
		/*let PointTransferPageModal = this.modalCtrl.create(PointTransferPage, { token: this.token });
		PointTransferPageModal.present();*/

    this.navCtrl.push('PointTransferPage');
  }

}
