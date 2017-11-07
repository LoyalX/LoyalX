import { Web3Service } from './web3-service';

export class Token {

	constructor(private tokenAddress = null) { }

	private get contractName() { return "LoyaltyToken" };

	public async getContract() {
		return await Web3Service.getContract(this.contractName);
	}

	public async getContractInstance() {
		var contract = await this.getContract();
		return this.tokenAddress ? contract.at(this.tokenAddress) : await contract.deployed();
	}

	public async getBalance() {
		try {
			var account = await Web3Service.getAccount();
			var contractInstance = await this.getContractInstance();
			var result = await contractInstance.balanceOf(account);

			console.log("getBalance", result);
			return result;
		} catch (err) {
			console.warn(err.message);
			throw err;
		}
	}

	public async transfer(amount: number, toAddress: any) {
		try {
			var contractInstance = await this.getContractInstance();
			var account = await Web3Service.getAccount();
			var result = await contractInstance.transfer(toAddress, amount, { from: account });

			console.log("handleTransfer", result);
			return result;
		} catch (err) {
			console.warn(err.message);
			throw err;
		}
	}

}
