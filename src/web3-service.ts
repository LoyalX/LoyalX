import { ContractArtifact } from './contract-artifact';
import Web3 = require('web3');

export class Web3Service {

	private static _web3: Web3;
	private static _provider;
	private static _contracts: any = {};
	public static Server;
	public static TruffleContract;

	public static get web3(): Web3 { return this._web3; }
	public static get provider() { return this._provider; }
	public static get isWeb3Injected() { return (typeof web3 !== 'undefined'); }

	public static init() {
		if (this._web3 != null) { return; }
		
		if (typeof web3 !== 'undefined') {
			this._provider = web3.currentProvider;
			this._web3 = new Web3(web3.currentProvider);
		} else {
			this._provider = new Web3.providers.HttpProvider(this.Server.HTTP_PROVIDER);
			this._web3 = new Web3(this._provider);
		}

	}

	public static async getContract(contractName: string) {
		if (this._contracts[contractName]) {
			return this._contracts[contractName];
		}
		// Get the necessary contract artifact file and instantiate it with truffle-contract.
		var contractArtifact = await ContractArtifact.get(contractName, Web3Service.Server);
		var contract = this.TruffleContract(contractArtifact);
		// var contract = new this.Web3Provider.web3.eth.Contract(contractArtifact);
		contract.setProvider(Web3Service.provider); // Set the provider for our contract.
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

	public static hasMetaMask() {
		return ((typeof web3 !== "undefined") && (web3.currentProvider.isMetaMask === true));
	}

	public static isOnProperNetwork(): Promise<boolean> {
		var promise: Promise<boolean> = new Promise((resolve, reject) => {

			(<any>this.web3.eth.net).getNetworkType()
				.then(networkType => console.log("Network type", networkType));

			(<any>this.web3.version).getNetwork((err, netId) => {
				if (err) {
					console.warn(err);
					reject(err);
				} else {
					console.log("Network id", netId);
					if (this.Server.NETWORK_ID == null) {
						console.warn("no network id specified in config, ignoring network check");
					}
					resolve((this.Server.NETWORK_ID == null) || (netId == this.Server.NETWORK_ID));
				}
			});

		});

		return promise;
	}

	/**
	 * get the first account
	 */
	public static async getAccount(): Promise<string> {
		try {
			var accounts = await this.web3.eth.getAccounts();
			console.log("getAccount", accounts[0]);
			return accounts[0];
		} catch (err) {
			console.warn(err.message);
			throw err;
		}
	}
}
