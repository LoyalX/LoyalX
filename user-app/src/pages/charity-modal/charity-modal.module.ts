import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CharityModalPage } from './charity-modal';

@NgModule({
  declarations: [
    CharityModalPage,
  ],
  imports: [
    IonicPageModule.forChild(CharityModalPage),
  ],
})
export class CharityModalPageModule {}
