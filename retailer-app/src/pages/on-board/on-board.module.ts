import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { OnBoardPage } from './on-board';

@NgModule({
  declarations: [
    OnBoardPage,
  ],
  imports: [
    IonicPageModule.forChild(OnBoardPage),
  ],
})
export class OnBoardPageModule {}
