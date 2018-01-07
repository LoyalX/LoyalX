import { Web3Service } from '../web3-service';
import { BigNumber } from 'bignumber.js';
import { Contract } from './contract';
import { RewardProgram } from './reward-program';
import { BadgeProgram } from './badge-program';

export class Organization extends Contract {

	public get contractName() { return "Organization" };

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

	public async getAttribs() {
		try {
			var contractInstance = await this.getContractInstance();

			var result = {
				name: await contractInstance.name(),
				website: await contractInstance.website(),
				email: await contractInstance.email(),
				country: await contractInstance.country(),
				image: await contractInstance.image(),
				about: await contractInstance.about(),
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
