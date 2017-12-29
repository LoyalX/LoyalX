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

  private _info: string = "";
  public displayInfo: boolean = false;

  @Input()
  src: string = "";

  @Input()
  backgroundColor: string = "#51D2B7";

  @Input()
  textColor: string = "black";

  @Input() set info(value: string) {
    this._info = value;
    this.setDisplayInfo(this._info !== "");
  }

  get info() {
    return this._info;
  }

  setDisplayInfo(state: boolean) {
    this.displayInfo = state;
  }

  constructor() {
    console.log('Hello LoyalBadgeComponent Component');
  }

}
