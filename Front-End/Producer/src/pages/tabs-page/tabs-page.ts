import { Component } from '@angular/core';

import { NavParams } from 'ionic-angular';

import { PointListPage } from '../point-list/point-list';

@Component({
  templateUrl: 'tabs-page.html'
})
export class TabsPage {
  // set the root pages for each tab
  tab1Root: any = PointListPage;
  tab2Root: any = PointListPage;
  tab3Root: any = PointListPage;
  tab4Root: any = PointListPage;

  mySelectedIndex: number;

  constructor(navParams: NavParams) {
    this.mySelectedIndex = navParams.data.tabIndex || 0;
  }

}
