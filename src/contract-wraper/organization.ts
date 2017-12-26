import { Web3Service } from '../web3-service';
import { BigNumber } from 'bignumber.js';
import { Contract } from './contract';

export class Organization extends Contract {

	/**
	 * 
	 * @param tokenAddress the token contract address OR null for the main loyalX tokens
	 */
	constructor(address: string) {
		super();
		this._address = address;
	}

	public get contractName() { return "Organization" };

	public async issueBadge(badgeName: string, badgeClass: string, ownerName: string, ownerAddress: string): Promise<string> {
		try {
			var contractInstance = await this.getContractInstance();
			var web3ServiceInstance = await (Web3Service.getInstance());
			var account = await web3ServiceInstance.getAccount();
			var result = await contractInstance.issueBadge(badgeName, badgeClass, ownerName, ownerAddress, { from: account });

			console.log("issueBadge", result);
			return result;
		} catch (err) {
			console.warn(err.message);
			throw err;
		}
	}

	public async getBadgesAddress(owner?: string): Promise<string[]> {
		try {
			var web3ServiceInstance = await (Web3Service.getInstance());
			var contractInstance = await this.getContractInstance();
			var account = owner ? owner : (await web3ServiceInstance.getAccount());
			var result = await contractInstance.getBadgesAddress(account);

			console.log("getBadgesAddress", result);
			return result;
		} catch (err) {
			console.warn(err.message);
			throw err;
		}
	}

}
