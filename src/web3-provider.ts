//Provider Engine sub-modules
let ProviderEngine = require('web3-provider-engine');
let CacheSubprovider = require('web3-provider-engine/subproviders/cache.js');
let FixtureSubprovider = require('web3-provider-engine/subproviders/fixture.js');
let FilterSubprovider = require('web3-provider-engine/subproviders/filters.js');
let VmSubprovider = require('web3-provider-engine/subproviders/vm.js');
let HookedWalletSubprovider = require('web3-provider-engine/subproviders/hooked-wallet.js');
let NonceSubprovider = require('web3-provider-engine/subproviders/nonce-tracker.js');
let RpcSubprovider = require('web3-provider-engine/subproviders/rpc.js');

import { ServerInfo } from './Servers';
import SERVERS from './Servers';


export class Web3Provider {
	private static _instance: Web3Provider;

	private _engine: any;
	private _server: ServerInfo;

	private constructor() {
		this._server = SERVERS.LOCALHOST;
		this._engine = new ProviderEngine();
		this.init();
	}

	init() {
		// static results
		this._engine.addProvider(new FixtureSubprovider({
			web3_clientVersion: 'ProviderEngine/v0.0.0/javascript',
			net_listening: true,
			eth_hashrate: '0x00',
			eth_mining: false,
			eth_syncing: true,
		}));

		// cache layer
		this._engine.addProvider(new CacheSubprovider());

		// filters
		this._engine.addProvider(new FilterSubprovider());

		// pending nonce
		this._engine.addProvider(new NonceSubprovider());

		// vm
		this._engine.addProvider(new VmSubprovider());

		// data source
		this._engine.addProvider(new RpcSubprovider({
			rpcUrl: this._server.HTTP_PROVIDER
		}));

		// log new blocks
		this._engine.on('block', function (block) {
			console.log('================================')
			console.log('BLOCK CHANGED:', '#' + block.number.toString('hex'), '0x' + block.hash.toString('hex'))
			console.log('================================')
		});

		// network connectivity error
		this._engine.on('error', function (err) {
			// report connectivity errors
			console.error(err.stack)
		});

		// start polling for blocks
		this._engine.start();
	}

	setServer(server: ServerInfo) {
		this._server = server;
	}

	setRpcSubprovider(server: ServerInfo) {
		// data source
		this._engine.addProvider(new RpcSubprovider({
			rpcUrl: server.HTTP_PROVIDER
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

	public get server() {
		return this._server;
	}

	public static get Instance() {
		return this._instance || (this._instance = new this());
	}
}
