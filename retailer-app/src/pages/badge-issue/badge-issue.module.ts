import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { BadgeIssuePage } from './badge-issue';

@NgModule({
  declarations: [
    BadgeIssuePage,
  ],
  imports: [
    IonicPageModule.forChild(BadgeIssuePage),
  ],
})
export class BadgeIssuePageModule {}
