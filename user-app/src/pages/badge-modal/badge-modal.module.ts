import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { BadgeModalPage } from './badge-modal';

@NgModule({
  declarations: [
    BadgeModalPage,
  ],
  imports: [
    IonicPageModule.forChild(BadgeModalPage),
  ],
})
export class BadgeModalPageModule {}
