import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { BadgeModalPage } from './badge-modal';
import { ComponentsModule } from '../../components/components.module';

@NgModule({
  declarations: [
    BadgeModalPage,
  ],
  imports: [
    IonicPageModule.forChild(BadgeModalPage),
    ComponentsModule
  ],
})
export class BadgeModalPageModule {}
