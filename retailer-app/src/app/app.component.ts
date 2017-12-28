import { Component, ViewChild } from '@angular/core';

import { Events, MenuController, Nav, Platform } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';

import { Storage } from '@ionic/storage';

import { LoginPage } from '../pages/login/login';
import { SignupPage } from '../pages/signup/signup';
import { TabsPage } from '../pages/tabs-page/tabs-page';
import { TutorialPage } from '../pages/tutorial/tutorial';

import { ErrorPage } from '../pages/error/error';
import { RulesEnginePage } from '../pages/rules-engine/rules-engine';
import { OnBoardPage } from '../pages/on-board/on-board';
import { ProfilePage } from '../pages/profile/profile';
import { PointListPage } from '../pages/point-list/point-list';

import { UserData } from '../providers/user-data';
import { TransactionsPage } from '../pages/transactions/transactions';

export interface PageInterface {
	title: string;
	name: string;
	component: any;
	icon: string;
	logsOut?: boolean;
	index?: number;
	tabName?: string;
	tabComponent?: any;
}

@Component({
	templateUrl: 'app.template.html'
})
export class ConferenceApp {
	// the root nav is a child of the root app component
	// @ViewChild(Nav) gets a reference to the app's root nav
	@ViewChild(Nav) nav: Nav;

	// List of pages that can be navigated to from the left menu
	// the left menu only works after login
	// the login page disables the left menu
	appPages: PageInterface[] = [
		{ title: 'Transactions', name: "TransactionsPage", component: TransactionsPage, tabComponent: TransactionsPage, index: 0, icon: 'ios-cash' },
		{ title: 'Rules Engine', name: "RulesEnginePage", component: RulesEnginePage, tabComponent: RulesEnginePage, index: 1, icon: 'ios-analytics' },
		{ title: 'On Board', name: "OnBoardPage", component: OnBoardPage, tabComponent: OnBoardPage, index: 2, icon: 'pricetags' },
		{ title: 'Profile', name: "ProfilePage", component: ProfilePage, tabComponent: ProfilePage, index: 3, icon: 'person' }

	];
	loggedInPages: PageInterface[] = [
		{ title: 'Logout', name: 'TabsPage', component: TabsPage, icon: 'log-out', logsOut: true }
	];
	loggedOutPages: PageInterface[] = [
		{ title: 'Login', name: 'LoginPage', component: LoginPage, icon: 'log-in' },
		{ title: 'Signup', name: 'SignupPage', component: SignupPage, icon: 'person-add' }
	];
	rootPage: any;
	splitPaneEnabledState: boolean;

	constructor(
		public events: Events,
		public userData: UserData,
		public menu: MenuController,
		public platform: Platform,
		public storage: Storage,
		public splashScreen: SplashScreen
	) {

		//<<<<<<<<<<<<<<<<<<<<<<<
		this.rootPage = (typeof web3 !== 'undefined') ? RulesEnginePage : ErrorPage;

		this.platformReady();


		// decide which menu items should be hidden by current login status stored in local storage
		this.userData.hasLoggedIn().then((hasLoggedIn) => {
			this.enableMenu(hasLoggedIn === false);
		});

		this.setSplitPaneEnabledState(true);
		this.enableMenu(true);

		//this.listenToLoginEvents();
		this.listenToErrorEvents();
	}

	openPage(page: PageInterface) {
		let params = {};

		// the nav component was found using @ViewChild(Nav)
		// setRoot on the nav to remove previous pages and only have this page
		// we wouldn't want the back button to show in this scenario
		if (page.index) {
			params = { tabIndex: page.index };
		}

		// If we are already on tabs just change the selected tab
		// don't setRoot again, this maintains the history stack of the
		// tabs even if changing them from the menu
		if (this.nav.getActiveChildNavs().length && page.index != undefined) {
			this.nav.getActiveChildNavs()[0].select(page.index);
			// Set the root of the nav with params if it's a tab index
		} else {
			this.nav.setRoot(page.name, params).catch((err: any) => {
				console.log(`Didn't set nav root: ${err}`);
			});
		}

		if (page.logsOut === true) {
			// Give the menu time to close before changing to logged out
			this.userData.logout();
		}
	}

	openTutorial() {
		this.nav.setRoot(TutorialPage);
	}

	listenToErrorEvents() {
		this.events.subscribe('errorPage:enter', () => {
			this.setSplitPaneEnabledState(false);
			this.enableMenu(false);
		});

		this.events.subscribe('errorPage:leave', () => {
			this.setSplitPaneEnabledState(true);
			this.enableMenu(true);
		});
	}

	listenToLoginEvents() {
		this.events.subscribe('user:login', () => {
			this.enableMenu(true);
		});

		this.events.subscribe('user:signup', () => {
			this.enableMenu(true);
		});

		this.events.subscribe('user:logout', () => {
			this.setSplitPaneEnabledState(false);
			this.enableMenu(false);
		});
	}

	setSplitPaneEnabledState(state: boolean) {
		this.splitPaneEnabledState = state;
	}

	getSplitPaneEnabledState() {
		return this.splitPaneEnabledState;
	}

	enableMenu(state: boolean) {
		this.menu.enable(state);
	}

	platformReady() {
		// Call any initial plugins when ready
		this.platform.ready().then(() => {
			this.splashScreen.hide();
		});
	}

	isActive(page: PageInterface) {
		let childNav = this.nav.getActiveChildNavs()[0];

		// Tabs are a special case because they have their own navigation
		if (childNav) {
			if (childNav.getSelected() && childNav.getSelected().root === page.tabComponent) {
				return 'primary';
			}
			return;
		}

		if (this.nav.getActive() && this.nav.getActive().name === page.name) {
			return 'primary';
		}
		return;
	}
}
