import { NgModule } from '@angular/core';
import { LoyalBadgeComponent } from './loyal-badge/loyal-badge';
import { CommonModule } from '@angular/common';  
import { IonicModule } from 'ionic-angular';
@NgModule({
	declarations: [LoyalBadgeComponent],
	imports: [CommonModule, IonicModule],
	exports: [LoyalBadgeComponent]
})
export class ComponentsModule {}
