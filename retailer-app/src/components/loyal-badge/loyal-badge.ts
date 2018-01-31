import { Component, Input } from '@angular/core';

/**
 * Generated class for the LoyalBadgeComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'loyal-badge',
  templateUrl: 'loyal-badge.html'
})
export class LoyalBadgeComponent {

  @Input()
  image: string = "http://via.placeholder.com/40x40";

  @Input()
  name: string = "";

  @Input() 
  description: string = "";

  @Input()
  fontColor: string = "#000";

  @Input()
  backgroundColor: string = "#fff";

  constructor() {
    console.log('Hello LoyalBadgeComponent Component');
  }

}
