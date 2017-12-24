import { Component } from '@angular/core';

import { NavParams } from 'ionic-angular';

import { OnBoardPage } from '../on-board/on-board';
import { TokenListPage } from '../token-list/token-list';
import { ProfilePage } from '../profile/profile';

@Component({
  templateUrl: 'tabs-page.html'
})
export class TabsPage {
  // set the root pages for each tab
  tab1Root: any = TokenListPage;
  tab2Root: any = OnBoardPage;
  tab3Root: any = ProfilePage;

  mySelectedIndex: number;

  constructor(navParams: NavParams) {
    this.mySelectedIndex = navParams.data.tabIndex || 0;
  }

}
