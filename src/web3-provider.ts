import Config from './config';

const ProviderEngine = require("web3-provider-engine");
//Provider Engine sub-modules
const HookedWalletSubprovider = require('web3-provider-engine/subproviders/hooked-wallet.js');
const RpcSubprovider = require('web3-provider-engine/subproviders/rpc.js');

export class Web3Provider {
	private static _instance: Web3Provider;

	private _engine: any;

	private constructor() {
		this._engine = new ProviderEngine();
		this.init();
	}

	init() {
	}

	setRpc(url?: any) {
		// data source
		this._engine.addProvider(new RpcSubprovider({
			rpcUrl: url || Config.server.HTTP_PROVIDER
		}));
	}
	setHookedWallet(keyStore: any) {
		this._engine.addProvider(new HookedWalletSubprovider({
			getAccounts: (cb) => {
				let addresses = keyStore.getAddresses();
				cb(null, addresses);
			},
			signTransaction: (tx, cb) => {
				let signedTransactionCallback = (error, result) => {
					cb(null, result);
				};
				keyStore.signTransaction(tx, signedTransactionCallback);
			}
		}));
	}

	startPolling() {
		// start polling for blocks
		this._engine.start();
	}

	stopPolling() {
		// stop polling for blocks
		this._engine.stop();
	}

	public get engine() {
		return this._engine;
	}

	public static get Instance() {
		return this._instance || (this._instance = new this());
	}
}
