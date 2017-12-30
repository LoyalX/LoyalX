import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { BadgeListPage } from './badge-list';
import { ComponentsModule } from '../../components/components.module';

@NgModule({
  declarations: [
    BadgeListPage,
  ],
  imports: [
    IonicPageModule.forChild(BadgeListPage),
    ComponentsModule
  ],
})
export class BadgeListPageModule {}
