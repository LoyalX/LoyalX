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

  private _text: string = "";
  public displaytext: boolean = false;

  @Input()
  src: string = "";

  @Input()
  backgroundColor: string = "#51D2B7";

  @Input()
  textColor: string = "black";

  @Input() set text(value: string) {
    this._text = value;
    this.setDisplaytext(this._text !== "");
  }

  get text() {
    return this._text;
  }

  setDisplaytext(state: boolean) {
    this.displaytext = state;
  }

  constructor() {
    console.log('Hello LoyalBadgeComponent Component');
  }

}
