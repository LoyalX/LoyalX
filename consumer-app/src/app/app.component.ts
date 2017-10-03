import { Component, ViewChild } from '@angular/core';
import { Platform, Nav, Config, Events } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { TranslateService } from '@ngx-translate/core'


import { TabsPage } from '../pages/tabs/tabs';
import { PointListPage } from "../pages/point-list/point-list";

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage = TabsPage;
  activePage: any;

  @ViewChild(Nav) nav: Nav;


  pages: any[] = [
    { title: 'Points', component: PointListPage, icon: 'cash' },
    { title: 'Tabs', component: TabsPage, icon: 'logo-usd' },
  ]

  constructor(private translate: TranslateService,
     private platform: Platform,
       private config: Config,
        private statusBar: StatusBar,
         private splashScreen: SplashScreen,
          private events: Events) {

    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });

    this.activePage = this.pages[0];

    this.initTranslate();
  }

  initTranslate() {
    // Set the default language for translation strings, and the current language.
    this.translate.setDefaultLang('en');

    if (this.translate.getBrowserLang() !== undefined) {
      this.translate.use(this.translate.getBrowserLang());
    } else {
      this.translate.use('en'); // Set your language here
    }

    this.translate.get(['BACK_BUTTON_TEXT']).subscribe(values => {
      this.config.set('ios', 'backButtonText', values.BACK_BUTTON_TEXT);
    });
  }

  checkActive(page) {
    return page == this.activePage;
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
    this.activePage = page;
  }

  onMenuOpen(event) {
    this.events.publish('sidebar:open');
  }

  onMenuClose(event) {
    this.events.publish('sidebar:close');
  }

}


