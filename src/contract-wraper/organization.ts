import { Web3Service } from '../web3-service';
import { BigNumber } from 'bignumber.js';
import { Contract } from './contract';
import { RewardProgram } from './reward-program';
import { BadgeProgram } from './badge-program';

export class Organization extends Contract {

	public get contractName() { return "Organization" };

	public async getAttribs() {
		try {
			var contractInstance = await this.getContractInstance();

			var result = {
				name: await contractInstance.name(),
				country: await contractInstance.country(),
				version: await contractInstance.version(),
				metaData: JSON.parse(await contractInstance.metaData()),
				rewardProgram: new RewardProgram(await contractInstance.rewardProgram()),
				badgeProgram: new BadgeProgram(await contractInstance.badgeProgram())
			}
			console.log("getAttribs", result);
			return result;
		} catch (err) {
			console.warn(err.message);
			throw err;
		}
	}
}
