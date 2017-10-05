import { Component } from '@angular/core';

import { NavParams } from 'ionic-angular';

import { PointListPage } from '../point-list/point-list';
import { OnBoardPage } from '../on-board/on-board';
import { TokenListPage } from '../token-list/token-list';

@Component({
  templateUrl: 'tabs-page.html'
})
export class TabsPage {
  // set the root pages for each tab
  tab1Root: any = OnBoardPage;
  tab2Root: any = TokenListPage;
  tab3Root: any = PointListPage;

  mySelectedIndex: number;

  constructor(navParams: NavParams) {
    this.mySelectedIndex = navParams.data.tabIndex || 0;
  }

}
