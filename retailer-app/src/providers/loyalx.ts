import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import LoyalX from 'loyalx-jsapi';

/*
  Generated class for the LoyalXProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class LoyalXProvider {

  constructor() {
    console.log('Hello LoyalXProvider Provider');
  }

  	get get(){
		  return new LoyalX("");
	  }
}
