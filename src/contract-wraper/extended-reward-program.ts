import { Web3Service } from '../web3-service';
import { BigNumber } from 'bignumber.js';
import { RewardProgram } from './reward-program';

export class ExtendedRewardProgram extends RewardProgram {

	/**
	 * 
	 * @param tokenAddress the token contract address OR null for the main loyalX tokens
	 */
	constructor(address: string) {
		super(address);
		this._address = address;
	}

	public get contractName() { return "ExtendedRewardProgram"; }

	public async increaseSupply(value: number, to: string): Promise<boolean> {
		try {
			var contractInstance = await this.getContractInstance();
			var web3ServiceInstance = await (Web3Service.getInstance());
			var account = await web3ServiceInstance.getAccount();
			var result = await contractInstance.increaseSupply(value, to, { from: account });

			console.log("increaseSupply", result);
			return result;
		} catch (err) {
			console.warn(err.message);
			throw err;
		}
	}


	public async decreaseSupply(value: number, from: string): Promise<boolean> {
		try {
			var contractInstance = await this.getContractInstance();
			var web3ServiceInstance = await (Web3Service.getInstance());
			var account = await web3ServiceInstance.getAccount();
			var result = await contractInstance.decreaseSupply(value, from, { from: account });

			console.log("decreaseSupply", result);
			return result;
		} catch (err) {
			console.warn(err.message);
			throw err;
		}
	}

}
