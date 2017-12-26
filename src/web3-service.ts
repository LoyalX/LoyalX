let Web3 = require('web3');

import { Web3Provider } from './web3-provider';
import { Web3Wallet } from './web3-wallet';

import { ServerInfo } from './Servers';
import { ContractArtifact } from './contract-artifact';

import SERVERS from './Servers';

export class Web3Service {

	private static _instance: Web3Service;

	private _wallet: Web3Wallet;
	private _web3: any;
	private _contracts: any = {};
	private _server: ServerInfo;
	private _TruffleContract;

	private constructor() {
	}

	public async init(server?, TruffleContract?) {
		this._server = server;
		this._TruffleContract = TruffleContract;

		try {
			this._wallet = await (Web3Wallet.getInstance());
			this._web3 = new Web3(this._wallet.provider.engine);
		}
		catch (err) {
			console.warn(err);
		}

		return this;
	}

	public async getBalance() {
		try {
			let address = await (this._wallet.getAddress());
			let balance = this._web3.utils.fromWei(await (this._web3.eth.getBalance(address)), "ether");
			return balance;
		} catch (err) {
			console.warn(err);
			throw err;
		}
	}

	public async testSend() {
		var fromAddr = "0xf17f52151EbEF6C7334FAD080c5704D77216b732";
		var toAddr = await (this._wallet.getAddress());
		var valueEth = "1";
		var value = parseFloat(valueEth) * 1.0e18
		var gasPrice = 1
		var gas = 55555555555
		this._web3.eth.sendTransaction({ from: fromAddr, to: toAddr, value: value, gasPrice: gasPrice, gas: gas }, function (err, txhash) {
			console.log('error: ', err)
			console.log('txhash: ', txhash)
		})
	}

	/**
	 * get the trufflecontract and cache it in memory
	 * @param {string} contractName 
	 */
	public async getContract(contractName: string) {
		if (this._contracts[contractName]) {
			return this._contracts[contractName];
		}
		// Get the necessary contract artifact file and instantiate it with truffle-contract.
		var contractArtifact = await ContractArtifact.get(contractName, this._server);
		var contract = this._TruffleContract(contractArtifact);
		// var contract = new this.Web3Provider.web3.eth.Contract(contractArtifact);
		contract.setProvider(this.provider); // Set the provider for our contract.
		this._contracts[contractName] = contract;

		// workaround stolen from https://github.com/trufflesuite/truffle-contract/issues/57
		if (typeof contract.currentProvider.sendAsync !== "function") {
			contract.currentProvider.sendAsync = function () {
				return contract.currentProvider.send.apply(
					contract.currentProvider, arguments
				);
			};
		}

		return contract;
	}

	/**
 	* check if meta mask is used
 	*/
	public hasMetaMask() {
		return ((typeof this._web3 !== "undefined") && (this._web3.currentProvider.isMetaMask === true));
	}

	public isOnProperNetwork(): Promise<boolean> {
		var promise: Promise<boolean> = new Promise((resolve, reject) => {

			(<any>this._web3.eth.net).getNetworkType()
				.then(networkType => console.log("Network type", networkType));

			(<any>this._web3.eth.net).getId((err, netId) => {
				if (err) {
					console.warn(err);
					reject(err);
				} else {
					console.log("Network id", netId);
					if (this._server.NETWORK_ID == null) {
						console.warn("no network id specified in config, ignoring network check");
					}
					resolve((this._server.NETWORK_ID == null) || (netId == this._server.NETWORK_ID));
				}
			});

		});

		return promise;
	}


	/**
 	* get the first account
 	*/
	public async getAccount(): Promise<string> {
		try {
			var accounts = await this._web3.eth.getAccounts();
			console.log("getAccount", accounts[0]);
			return accounts[0];
		} catch (err) {
			console.warn(err.message);
			throw err;
		}
	}

	public get engine(): any { return this._wallet.provider.engine; }
	public get web3(): any { return this._web3; }
	public get provider() { return this._web3.currentProvider; }
	public get wallet() { return this._wallet; }

	public static async getInstance(server?, TruffleContract?) {
		return this._instance || (this._instance = (await new this().init(server, TruffleContract)));
	}

}
