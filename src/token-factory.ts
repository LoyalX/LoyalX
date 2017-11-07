import { Web3Service } from './web3-service';

export class TokenFactory {

	private get contractName() { return "LoyaltyTokenFactory" };

	public async getContract() {
		return Web3Service.getContract(this.contractName);
	}

	public async getContractInstance() {
		var contract = await this.getContract();
		return await contract.deployed();
	}

	public async initialiseRetail(retailSymbol: string, retailName: string, retailAmount: number, retailDecimal: number) {

		retailAmount *= Math.pow(10, retailDecimal);
		try {
			var account = await Web3Service.getAccount();
			var loyaltyFactoryInstance = await this.getContractInstance();

			var result = await loyaltyFactoryInstance.initialiseRetail(retailAmount, retailName, retailDecimal, retailSymbol, { from: account });

			console.log("handleOnboard", result);
			return result;
		} catch (err) {
			console.warn(err.message);
			throw err;
		}
	}

	public async getTokensAddress(): Promise<string[]> {
		try {
			var loyaltyFactoryInstance = await this.getContractInstance();

			var result = await loyaltyFactoryInstance.getTokensAddress();

			console.log("getTokensAddress", result);
			return result;

		} catch (err) {
			console.warn(err.message);
			throw err;
		}
	}

	public async getTokensAddressByOwner(): Promise<string[]> {
		try {
			var account = await Web3Service.getAccount();
			var loyaltyFactoryInstance = await this.getContractInstance();

			var result = <string[]>await loyaltyFactoryInstance.getTokensAddressByOwner(account);

			console.log("getTokensAddressByOwner", result);
			return result;

		} catch (err) {
			console.warn(err.message);
			throw err;
		}
	}

	private _parseTokensData(data): TokenData[] {
		var ret = <TokenData[]>[];

		for (var i = 0; i < data[0].length; i++) {
			ret.push({
				address: data[0][i],
				name: Web3Service.web3.utils.hexToUtf8(data[1][i]),
				symbol: Web3Service.web3.utils.hexToUtf8(data[2][i]),
				decimal: data[3][i].toNumber()
			});
		}

		return ret;
	}

	public async getTokens(): Promise<TokenData[]> {
		try {
			var loyaltyFactoryInstance = await this.getContractInstance();

			var result = await loyaltyFactoryInstance.getTokens();

			var ret = this._parseTokensData(result);
			console.log("getTokens", ret);
			return ret;
		} catch (err) {
			console.warn(err.message);
			throw err;
		}
	}

	public async getTokensByOwner(): Promise<TokenData[]> {
		try {
			var account = await Web3Service.getAccount();
			var loyaltyFactoryInstance = await this.getContractInstance();

			var result = await loyaltyFactoryInstance.getTokensByOwner(account);

			var ret = this._parseTokensData(result);
			console.log("getTokensByOwner", ret);
			return ret;
		} catch (err) {
			console.warn(err.message);
			throw err;
		}
	}

}

export interface TokenData {
	address: string;
	name: string;
	symbol: string;
	decimal: number;
}