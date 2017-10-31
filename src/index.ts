import { TokenFactory } from './token-factory';
import { Token } from './token';
import { Web3Service } from './web3-service';

export class LoyalX {
	static TokenFactory = new TokenFactory();
	static Token = Token;
	static LoyalXToken = new Token(null);
	static Web3Service = Web3Service;
}