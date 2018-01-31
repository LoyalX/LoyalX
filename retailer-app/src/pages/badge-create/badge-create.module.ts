import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { BadgeCreatePage } from './badge-create';

@NgModule({
  declarations: [
    BadgeCreatePage,
  ],
  imports: [
    IonicPageModule.forChild(BadgeCreatePage),
  ],
})
export class BadgeCreatePageModule {}
