import { Component } from '@angular/core';

import { NavParams } from 'ionic-angular';

import { AddressCodePage } from '../address-code/address-code'
import { TokenListPage } from '../token-list/token-list';

@Component({
  templateUrl: 'tabs-page.html'
})
export class TabsPage {
  // set the root pages for each tab
  tab1Root: any = AddressCodePage;
  tab2Root: any = TokenListPage;

  mySelectedIndex: number;

  constructor(navParams: NavParams) {
    this.mySelectedIndex = navParams.data.tabIndex || 0;
  }

}
