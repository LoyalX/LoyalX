import { NgModule } from '@angular/core';
import { LoyalBadgeComponent } from './loyal-badge/loyal-badge';
import { CommonModule } from '@angular/common';  
@NgModule({
	declarations: [LoyalBadgeComponent],
	imports: [CommonModule],
	exports: [LoyalBadgeComponent]
})
export class ComponentsModule {}
