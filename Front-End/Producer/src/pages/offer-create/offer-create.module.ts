import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { OfferCreatePage } from './offer-create';

@NgModule({
  declarations: [
    OfferCreatePage,
  ],
  imports: [
    IonicPageModule.forChild(OfferCreatePage),
  ],
})
export class OfferCreatePageModule {}
