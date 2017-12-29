import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TokenListPage } from './token-list';
import { ComponentsModule } from '../../components/components.module';

@NgModule({
  declarations: [
    TokenListPage
  ],
  imports: [
    IonicPageModule.forChild(TokenListPage),
    ComponentsModule
  ],
})
export class TokenListPageModule {}
