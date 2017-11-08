import { TokenFactory } from './token-factory';
import { Token } from './token';
import { Web3Service } from './web3-service';
import SERVERS from './Servers';
import { ServerInfo } from './Servers';

export default class LoyalX {
	TokenFactory = new TokenFactory();
	Token = Token;
	LoyalXToken = new Token(<any>null);
	Web3Service = Web3Service;
	static SERVERS = SERVERS;

	constructor(TruffleContract, server: ServerInfo = LoyalX.SERVERS.LOCALHOST) {
		this.Web3Service._init(server, TruffleContract);
	}
}