import { Web3Service } from '../web3-service';
import { BigNumber } from 'bignumber.js';
import { RewardProgram } from './reward-program';

export class ExtendedRewardProgram extends RewardProgram {

	public get contractName() { return "ExtendedRewardProgram"; }

	public async increaseSupply(value: number, to: string): Promise<boolean> {
		this.genericCall("increaseSupply",[value, to]);
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
