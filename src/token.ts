import TruffleContract from 'truffle-contract';
import { Web3Service } from './web3-service';


export class Tokens {

	private _contract;

	private static get contractName() { return "LoyaltyTokenFactory" };

	public static async getContract() {
		return Web3Service.getContract(this.contractName);
	}


	public async getBalance(tokenAddress?: any) {
		try {
			var contract = <any>await Tokens.getContract();
			var account = await Web3Service.getAccount();
			var loyaltyTokenInstance = tokenAddress ? contract.at(tokenAddress) : await contract.deployed();
			var result = await loyaltyTokenInstance.balanceOf(account);

			console.log("getBalance", result);
			return result;
		} catch (err) {
			console.warn(err.message);
			throw err;
		}
	}

	public async handleTransfer(amount: number, toAddress: any, tokenAddress?: any) {

		try {
			var contract = <any>await Tokens.getContract();
			var account = await Web3Service.getAccount();
			var loyaltyTokenInstance = tokenAddress ? contract.at(tokenAddress) : await contract.deployed();

			var result = await loyaltyTokenInstance.transfer(toAddress, amount, { from: account });

			console.log("handleTransfer", result);
			return result;
		} catch (err) {
			console.warn(err.message);
			throw err;
		}
	}

}
