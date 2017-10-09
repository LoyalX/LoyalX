import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PointTransferPage } from './point-transfer';

@NgModule({
  declarations: [
    PointTransferPage,
  ],
  imports: [
    IonicPageModule.forChild(PointTransferPage),
  ],
})
export class PointTransferPageModule {}
