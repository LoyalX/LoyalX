import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { BrandDetailPage } from './brand-detail';

@NgModule({
  declarations: [
    BrandDetailPage,
  ],
  imports: [
    IonicPageModule.forChild(BrandDetailPage),
  ],
})
export class BrandDetailPageModule {}
