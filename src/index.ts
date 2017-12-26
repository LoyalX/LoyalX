
import { TokenFactory } from './token-factory';
import { Token } from './token';
import { Web3Service } from './web3-service';
import SERVERS from './Servers';
import { ServerInfo } from './Servers';
import * as TruffleContract from 'truffle-contract';

export default class LoyalX {
	static web3ServiceInstance: Web3Service = null;
	static TokenFactory = new TokenFactory();
	static Token = Token;
	static LoyalXToken = new Token(<any>null);
	static Web3Service = Web3Service;
	static SERVERS = SERVERS;

	constructor(TruffleContract, server: ServerInfo = LoyalX.SERVERS.LOCALHOST) {
		LoyalX.Web3Service.getInstance(server, TruffleContract)
			.then(web3ServiceInstance => LoyalX.web3ServiceInstance = web3ServiceInstance);
	}

	public static async init(TruffleContract, server: ServerInfo = LoyalX.SERVERS.LOCALHOST) {
		LoyalX.web3ServiceInstance = LoyalX.web3ServiceInstance ? LoyalX.web3ServiceInstance : (await (Web3Service.getInstance(server, TruffleContract)));
		return this;
	}

	public static async getWeb3ServiceInstance(TruffleContract, server: ServerInfo = LoyalX.SERVERS.LOCALHOST) {
		return LoyalX.web3ServiceInstance || (LoyalX.web3ServiceInstance = (await (Web3Service.getInstance(server, TruffleContract))));
	}
}