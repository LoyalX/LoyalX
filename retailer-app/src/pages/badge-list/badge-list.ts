import { Component } from "@angular/core";
import {
	IonicPage,
	NavController,
	NavParams,
	ModalController,
	LoadingController,
	PopoverController,
	ViewController
} from "ionic-angular";
import { BadgeModalPage } from "../badge-modal/badge-modal";
import { LoyalXProvider } from "../../providers/loyalx";
import { BadgeCreatePage } from "../badge-create/badge-create";
import { BadgeIssuePage } from "../badge-issue/badge-issue";

/**
 * Generated class for the BadgeListPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
	selector: "page-badge-list",
	templateUrl: "badge-list.html"
})
export class BadgeListPage {
	public organization: any = {};
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
		public loyalXProvider: LoyalXProvider,
		public popoverCtrl: PopoverController
	) {}

	private updateBadges = async data => {
		if (data) {
			let loading = this.loadingCtrl.create({
				content: "Loading, Please Wait..."
			});
			loading.present();

			try {
				if (this.organization) {
					await this.organization.badgeProgram.add(data);
					this.organization.badgeProgram.badges.push(data);
				}
			} catch (err) {
				alert(err);
			}
			loading.dismiss();
		}
	};

	presentBadgeCreate() {
		try {
			let badgeCreateModal = this.modalCtrl.create(BadgeCreatePage);
			badgeCreateModal.present();
			badgeCreateModal.onDidDismiss(this.updateBadges);
		} catch (err) {
			alert(err);
		}
	}

	presentBadgeIssue() {
		let badgeIssueModal = this.modalCtrl.create(BadgeIssuePage, {
			badges: this.organization.badgeProgram.badges
		});
		badgeIssueModal.present();
		badgeIssueModal.onDidDismiss(async data => {
			if (data) {
				let loading = this.loadingCtrl.create({
					content: "Loading, Please Wait..."
				});
				loading.present();

				try {
					await this.organization.badgeProgram.issue(
						data.badge,
						data.address
					);
				} catch (err) {
					alert(err);
				}

				loading.dismiss();
			}
		});
	}

	presentPopoverBadgeAction(event) {
		let popover = this.popoverCtrl.create(PopoverBadgeActionPage);
		popover.present({
			ev: event
		});
		popover.onDidDismiss(this.updateBadges);
	}

	async ionViewDidLoad() {
		let loading = this.loadingCtrl.create({
			content: "Loading, Please Wait..."
		});
		loading.present();

		try {
			let loyalx = await this.loyalXProvider.getInstance();
			let organization = await loyalx.OrganizationFactory.findOrganizationByOwner();

			organization = {
				...organization,
				...(await organization.getAttribs())
			};
			organization.badgeProgram.badges = await organization.badgeProgram.getBadges();

			let badgeProgram = organization.badgeProgram;
			for (const badgeKey in badgeProgram.badges) {
				badgeProgram.badges[badgeKey] = {
					...badgeProgram.badges[badgeKey],
					...(await badgeProgram.badges[badgeKey].getAttribs())
				};
			}

			this.organization = organization;
		} catch (err) {
			alert(err);
		}

		loading.dismiss();
	}

	presentBadgeModal(badge, organization) {
		let modal = this.modalCtrl.create(BadgeModalPage, {
			badge: badge,
			organization: organization
		});
		modal.present();
	}
}

@Component({
	template: `
    <ion-list no-lines>
          <ion-list-header color="google">Select Action</ion-list-header>
          <button ion-item (click)="presentBadgeIssue()">
                Issue Badge
                <ion-icon name="ribbon" item-start></ion-icon>
          </button>
          <button ion-item (click)="presentBadgeCreate()">
                Add New Badge
                <ion-icon name="add" item-start></ion-icon>
          </button>
    </ion-list>
  `
})
export class PopoverBadgeActionPage {
	public organization: any = {};

	constructor(
		public viewCtrl: ViewController,
		public params: NavParams,
		public modalCtrl: ModalController,
		public loadingCtrl: LoadingController,
		public loyalXProvider: LoyalXProvider
	) {}

	async ionViewDidLoad() {
		let loyalx = await this.loyalXProvider.getInstance();
		let organization = await loyalx.OrganizationFactory.findOrganizationByOwner();

		organization = {
			...organization,
			...(await organization.getAttribs())
		};
		organization.badgeProgram.badges = await organization.badgeProgram.getBadges();

		let badgeProgram = organization.badgeProgram;
		for (const badgeKey in badgeProgram.badges) {
			badgeProgram.badges[badgeKey] = {
				...badgeProgram.badges[badgeKey],
				...(await badgeProgram.badges[badgeKey].getAttribs())
			};
		}

		this.organization = organization;
	}

	presentBadgeCreate() {
		let badgeCreateModal = this.modalCtrl.create(BadgeCreatePage);
		badgeCreateModal.present();
		badgeCreateModal.onDidDismiss(data => {
			this.viewCtrl.dismiss(data);
		});
	}
	async presentBadgeIssue() {
		let badgeIssueModal = this.modalCtrl.create(BadgeIssuePage, {
			badges: this.organization.badgeProgram.badges
		});
		badgeIssueModal.present();

		badgeIssueModal.onDidDismiss(async data => {
			if (data) {
				let loading = this.loadingCtrl.create({
					content: "Loading, Please Wait..."
				});

				loading.present();

				try {
					await this.organization.badgeProgram.issue(
						data.badge,
						data.address
					);
					this.viewCtrl.dismiss();
				} catch (err) {
					alert(err);
				}
				loading.dismiss();
			}
		});
	}
}
