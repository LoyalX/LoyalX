import { Web3Service } from './web3-service';

export class TokenFactory {

	private static get contractName() { return "LoyaltyTokenFactory" };

	public static async getContract() {
		return Web3Service.getContract(this.contractName);
	}

	public static async handleOnboard(retailSymbol: string, retailName: string, retailAmount: number, retailDecimal: number) {

		retailAmount *= Math.pow(10, retailDecimal);
		try {
			var contract = <any>await this.getContract();
			var account = await Web3Service.getAccount();
			var loyaltyFactoryInstance = await contract.deployed();

			var result = await loyaltyFactoryInstance.initialiseRetail(retailAmount, retailName, retailDecimal, retailSymbol, { from: account });

			console.log("handleOnboard", result);
			return result;
		} catch (err) {
			console.warn(err.message);
			throw err;
		}
	}

	public static async getTokensAddress() {

		try {
			var contract = <any>await this.getContract();
			var loyaltyFactoryInstance = await contract.deployed();

			var result = await loyaltyFactoryInstance.getTokensAddress();

			console.log("getTokensAddress", result);
			return result;

		} catch (err) {
			console.warn(err.message);
			throw err;
		}
	}

	public static async getTokensAddressByOwner() {

		try {
			var contract = <any>await this.getContract();
			var account = await Web3Service.getAccount();
			var loyaltyFactoryInstance = await contract.deployed();

			var result = await loyaltyFactoryInstance.getTokensAddressByOwner(account);

			console.log("getTokensAddressByOwner", result);
			return result;

		} catch (err) {
			console.warn(err.message);
			throw err;
		}
	}

	private static _parseTokensData(data) {
		var ret = <any[]>[];

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

	public static async getTokens() {
		try {
			var contract = <any>await this.getContract();
			var loyaltyFactoryInstance = await contract.deployed();

			var result = await loyaltyFactoryInstance.getTokens();

			var ret = this._parseTokensData(result);
			console.log("getTokens", ret);
			return ret;
		} catch (err) {
			console.warn(err.message);
			throw err;
		}
	}
	
	public static async getTokensByOwner() {
		try {
			var contract = <any>await this.getContract();
			var account = await Web3Service.getAccount();
			var loyaltyFactoryInstance = await contract.deployed();

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