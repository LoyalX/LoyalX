import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';

import { QRCodeModule } from 'angular2-qrcode';

import { AddressCodePage } from './address-code';

@NgModule({
  declarations: [
    AddressCodePage,
  ],
  imports: [
	QRCodeModule,
    IonicPageModule.forChild(AddressCodePage),
   ],
   schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class AddressCodePageModule {}
