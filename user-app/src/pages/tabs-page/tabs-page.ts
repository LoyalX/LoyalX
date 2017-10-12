import { Component } from '@angular/core';

import { NavParams } from 'ionic-angular';

import { AddressCodePage } from '../address-code/address-code'
import { TokenListPage } from '../token-list/token-list';

@Component({
  templateUrl: 'tabs-page.html'
})
export class TabsPage {
  // set the root pages for each tab
  tab1Root: any = TokenListPage;
  tab2Root: any = AddressCodePage;

  mySelectedIndex: number;

  constructor(navParams: NavParams) {
    this.mySelectedIndex = navParams.data.tabIndex || 0;
  }

}
