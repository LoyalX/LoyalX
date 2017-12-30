import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TokenListPage } from './token-list';

@NgModule({
  declarations: [
    TokenListPage
  ],
  imports: [
    IonicPageModule.forChild(TokenListPage)
  ],
})
export class TokenListPageModule {}
