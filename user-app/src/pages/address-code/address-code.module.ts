import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AddressCodePage } from './address-code';

@NgModule({
  declarations: [
    AddressCodePage,
  ],
  imports: [
    IonicPageModule.forChild(AddressCodePage),
  ],
})
export class AddressCodePageModule {}
