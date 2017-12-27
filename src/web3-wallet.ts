// import lightwallet = require("eth-lightwallet");
import { Web3Provider } from './web3-provider';
import Config from './config';

export class Web3Wallet {

	private static _instance: Web3Wallet;
	private lightWallet

	private _provider: Web3Provider = Web3Provider.Instance;
	private _keyStore: any;
	private _address: any;

	private constructor() {
	}

	private async _init(password: string, randomSeed: string) {
		this.lightWallet = Config.LightWallet;
		try {
			this._keyStore = await (this._createKeyStore(password, randomSeed));
			this._address = await (this._generateAddresses(password)) ? this._keyStore.getAddresses()[0] : "";
		}
		catch (err) {
			console.warn(err);
		}
		return this;
	}

	private _createKeyStore(password: string, randomSeed: string) {
		return new Promise((resolve, reject) => {
			this.lightWallet.keystore.createVault({
				password: password,
				seedPhrase: randomSeed,
				//random salt 
				hdPathString: Config.server.HD_PATH
			}, (err, keyStore) => {
				if (err) return reject(err);
				else resolve(keyStore);
			});
		});
	}

	private _keyFromPassword(password: string) {
		return new Promise((resolve, reject) => {
			this._keyStore.keyFromPassword(password, (err, pwDerivedKey) => {
				if (err) return reject(err);
				else resolve(pwDerivedKey);
			});
		});
	}

	private async _generateAddresses(password: string, numberOfAddresses: number = 1) {
		try {
			let pwDerivedKey = await (this._keyFromPassword(password));
			this._keyStore.generateNewAddress(pwDerivedKey, numberOfAddresses);
			return true;
		}
		catch (err) {
			console.warn(err);
			return false;
		}
	}

	public async getAddress() {
		return await this._keyStore.getAddresses()[0];
	}

	public get provider() {
		return this._provider;
	}

	public get keyStore() {
		return this._keyStore;
	}

	public static async getInstance(password?: string, extraEntropy?: string) {
		// var extraEntropy = prompt('Please enter a random text to generate entropy');
		// var randomSeed = lightwallet.keystore.generateRandomSeed(extraEntropy);
		// var password = prompt('Please enter a password to encrypt your seed while in the app');
		
		password = "password";
		var randomSeed = "candy maple cake sugar pudding cream honey rich smooth crumble sweet treat";

		return this._instance || (this._instance = (await new this()._init(password, randomSeed)));
	}
}
