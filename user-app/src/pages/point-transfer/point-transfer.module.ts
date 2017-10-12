import { NgModule, ErrorHandler } from '@angular/core';
import { IonicPageModule, IonicErrorHandler } from 'ionic-angular';
import { PointTransferPage } from './point-transfer';
import { QRScanner } from "@ionic-native/qr-scanner";

@NgModule({
  declarations: [
    PointTransferPage,
  ],
  imports: [
    IonicPageModule.forChild(PointTransferPage),
],
providers: [
	{ provide: ErrorHandler, useClass: IonicErrorHandler },
	QRScanner
]
})
export class PointTransferPageModule {}
