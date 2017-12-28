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
	public loyal;
	public Web3Service;

	public Token;
	public TokenFactory;

	constructor() {
		LoyalX.init({
			TruffleContract: TruffleContract,
			lightwallet: lightwallet,
			server: CONFIG.IS_PRODUCTION ? LoyalX.SERVERS.PRODUCTION : LoyalX.SERVERS.LOCALHOST
		})
			.then(loyalx => {
				this.loyal = loyalx;
				this.Web3Service = this.loyal.Web3Service;

				/*this.loyal.OrganizationFactory.createOrganization({
					name: "name",
					website: "website",
					email: "email",
					logoURL: "logoURL",
					tokenIconURL: "tokenIconURL",
					about: "about",
					tokenInitialAmount: 10000000,
					tokenName: "tokenName",
					tokenDecimal: 2,
					tokenSymbol: "tokenSymbol"
				});*/
			})

		var symbol = "tst",
			name = "test",
			amount = 1000000,
			decimal = 2;

		/*this.loyal.TokenFactory.getTokensAddress()
			.then(data => console.log("tokens", data))
			.catch(err => console.warn("tokens", err));

		this.loyal.TokenFactory.initialiseRetail(symbol, name, amount, decimal)
			.then(data => console.log("init retail", data))
			.catch(err => console.warn("init retail", err));*/
	}
}
