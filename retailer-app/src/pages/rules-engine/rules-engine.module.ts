import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { RulesEnginePage } from './rules-engine';

@NgModule({
  declarations: [
    RulesEnginePage,
  ],
  imports: [
    IonicPageModule.forChild(RulesEnginePage),
  ],
})
export class RulesEnginePageModule {}
