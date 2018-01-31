import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import LoyalX from 'loyalx.js';
import CONFIG from '../config';

declare var TruffleContract;
declare var lightwallet;

/*
  Generated class for the LoyalXProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class LoyalXProvider {
	public loyalx = null;
	public Web3Service;
	public OrganizationFactory;
	public RewardProgram;

	public Token;
	public TokenFactory;

	constructor() {
		this.init();
	}

	init() {
		return new Promise((resolve, reject) => {
			LoyalX.init({
				TruffleContract: TruffleContract,
				lightwallet: lightwallet,
				server: CONFIG.IS_PRODUCTION ? LoyalX.SERVERS.PRODUCTION : LoyalX.SERVERS.LOCALHOST
			})
				.then(loyalx => {
					this.loyalx = loyalx;
					this.loyalx.Web3Service.wallet.setPasswordGetter(function () {
						let password = prompt("Please enter your password to continue", "password");
						return password;
					})
					resolve(loyalx);
				})
		});
	}

	public async getInstance() {
		return this.loyalx || (this.loyalx = await this.init());
	}

}
