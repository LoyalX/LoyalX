import { TokenFactory } from './token-factory';
import { Token } from './token';
import { Web3Service } from './web3-service';
import SERVERS from './Servers';

class LoyalX {
	static TokenFactory = new TokenFactory();
	static Token = Token;
	static LoyalXToken = new Token(null);
	static Web3Service = Web3Service;
	static SERVERS = SERVERS;
}

LoyalX.Web3Service.Server = LoyalX.SERVERS.LOCALHOST;

export default LoyalX;