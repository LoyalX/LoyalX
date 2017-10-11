import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import Web3 from 'web3';
import CONFIG from '../../app.config';

@Injectable()
export class Web3Provider {

	private _web3: Web3;
	private _provider: Web3.providers.HttpProvider;

	public get web3(): Web3 { return this._web3; }
	public get provider(): Web3.providers.HttpProvider { return this._provider; }
	public get isWeb3Injected() { return (typeof web3 !== 'undefined'); }

	constructor() {
		if (typeof web3 !== 'undefined') {
			this._provider = web3.currentProvider;
			this._web3 = new Web3(web3.currentProvider);
		} else {
			this._provider = new Web3.providers.HttpProvider(CONFIG.HTTP_PROVIDER);
			this._web3 = new Web3(this._provider);
		}
	}

	public hashMetaMask() {
		return ((typeof web3 !== "undefined") && (web3.currentProvider.isMetaMask === true))
	}

	public isOnProperNetwork(): Promise<boolean> {
		var promise: Promise<boolean> = new Promise((resolve, reject) => {

			//this.web3.eth.getId().then(console.log);
			this.web3.eth.net.getNetworkType()
				.then(networkType => console.log("Network type", networkType));

			web3.version.getNetwork((err, netId) => {
				if (err) {
					console.warn(err);
					reject(err);
				} else {
					console.log("Network id", netId);
					if (CONFIG.NETWORK_ID == null) {
						console.warn("no network id specified in config, ignoring network check");
					}
					resolve((CONFIG.NETWORK_ID == null) || (netId == CONFIG.NETWORK_ID));
				}
			});
		});

		return promise;
	}

	/**
	 * get the first account
	 */
	public getAccount(): Promise<any> {
		var promise = new Promise((resolve, reject) => {

			this.web3.eth.getAccounts((error, accounts) => {
				if (error) {
					console.warn(error);
					reject(error);
				} else {
					var account = accounts[0];
					console.log("getAccount", account);
					resolve(account);
				}
			});

		});
		return promise;
	}
}
