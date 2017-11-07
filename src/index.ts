import { TokenFactory } from './token-factory';
import { Token } from './token';
import { Web3Service } from './web3-service';
import SERVERS from './Servers';

export default class LoyalX {
	TokenFactory = new TokenFactory();
	Token = Token;
	LoyalXToken = new Token(null);
	Web3Service = Web3Service;
	static SERVERS = SERVERS;

	constructor(TruffleContract, server = LoyalX.SERVERS.LOCALHOST) {
		this.Web3Service.Server = server;
		this.Web3Service.TruffleContract = TruffleContract;
		this.Web3Service.init();
	}
}