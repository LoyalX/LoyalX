import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { FeatureModalPage } from './feature-modal';

@NgModule({
  declarations: [
    FeatureModalPage,
  ],
  imports: [
    IonicPageModule.forChild(FeatureModalPage),
  ],
})
export class FeatureModalPageModule {}
