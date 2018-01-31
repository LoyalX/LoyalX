import { Injectable } from "@angular/core";
import "rxjs/add/operator/map";
import LoyalX from "loyalx.js";
import CONFIG from "../config";

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
	private Web3Service;
	private OrganizationFactory;
	private RewardProgram;

	private Token;
	private TokenFactory;

	constructor() {}

	private _init() {
		LoyalX.setPasswordSetter(function() {
			let password = prompt(
				"Please enter a password to encrypt your seed",
				"password"
			);
			if (password) {
				return password;
			}
		});
		LoyalX.setPasswordGetter(function() {
			let password = prompt(
				"Please enter your password to continue",
				"password"
			);
			if (password) {
				return password;
			}
		});

		return new Promise((resolve, reject) => {
			LoyalX.init({
				TruffleContract: TruffleContract,
				lightwallet: lightwallet,
				server: CONFIG.IS_PRODUCTION
					? LoyalX.SERVERS.PRODUCTION
					: LoyalX.SERVERS.LOCALHOST
			})
				.then(loyalx => {
					this.loyalx = loyalx;
					resolve(loyalx);
				})
				.catch(err => reject(err));
		});
	}

	public async getInstance() {
		try {
			if (!this.loyalx) {
				this.loyalx = await this._init();
			}
		} catch (err) {
			throw err;
		}
		return this.loyalx;
	}
}
