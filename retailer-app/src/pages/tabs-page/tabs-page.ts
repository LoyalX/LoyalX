import { Component } from '@angular/core';

import { NavParams } from 'ionic-angular';

import { OnBoardPage } from '../on-board/on-board';
import { TokenListPage } from '../token-list/token-list';

@Component({
  templateUrl: 'tabs-page.html'
})
export class TabsPage {
  // set the root pages for each tab
  tab1Root: any = OnBoardPage;
  tab2Root: any = TokenListPage;

  mySelectedIndex: number;

  constructor(navParams: NavParams) {
    this.mySelectedIndex = navParams.data.tabIndex || 0;
  }

}
