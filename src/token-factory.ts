import { Web3Service } from './web3-service';

export class TokenFactory {

	/**
	 * @return {string} the contract name
	 */
	private get contractName(): string { return "LoyaltyTokenFactory" };

	/**
	 * @return {TruffleContract} the contract
	 */
	public async getContract() {
		return Web3Service.getContract(this.contractName);
	}

	/**
	 * @return {TruffleContract Instance} the contract instance
	 */
	public async getContractInstance() {
		var contract = await this.getContract();
		return await contract.deployed();
	}

	/**
	 * deploy a new token contract
	 * @param retailSymbol a short name usualy 3 chars
	 * @param retailName reward point name
	 * @param retailAmount total points in circulation
	 * @param retailDecimal how many decimal point
	 */
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

	/**
	 * get all token's addresses
	 * @returns {Promise<string[]>}
	 */
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

	/**
	 * get all token's addresses created by the user account
	 * @returns {Promise<string[]>}
	 */
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

	/**
	 *  get all token's data
	 * @returns {Promise<TokenData[]>}
	 */
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

	/**
	 *  get all token's data created by the user account
	 * @returns {Promise<TokenData[]>}
	 */
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