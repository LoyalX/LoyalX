import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import LoyalX from 'loyalx-jsapi';
import CONFIG from '../config';

/*
  Generated class for the LoyalXProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class LoyalXProvider {

	private loyal = new LoyalX(
		TruffleContract,
		CONFIG.IS_PRODUCTION ? LoyalX.SERVERS.PRODUCTION : LoyalX.SERVERS.LOCALHOST
	);

	public LoyalXToken = this.loyal.LoyalXToken;
	public Token = this.loyal.Token;
	public TokenFactory = this.loyal.TokenFactory;
	public Web3Service = this.loyal.Web3Service;

	constructor() { }
}
