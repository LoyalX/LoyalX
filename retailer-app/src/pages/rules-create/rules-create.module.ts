import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { RulesCreatePage } from './rules-create';

@NgModule({
  declarations: [
    RulesCreatePage,
  ],
  imports: [
    IonicPageModule.forChild(RulesCreatePage),
  ],
})
export class RulesCreatePageModule {}
