import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { FeaturesPage } from './features';

@NgModule({
  declarations: [
    FeaturesPage,
  ],
  imports: [
    IonicPageModule.forChild(FeaturesPage),
  ],
})
export class FeaturesPageModule {}
