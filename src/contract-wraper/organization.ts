import { Web3Service } from '../web3-service';
import { BigNumber } from 'bignumber.js';
import { Contract } from './contract';
import { RewardProgram } from './reward-program';

export class Organization extends Contract {

	public get contractName() { return "Organization" };

	public async issueBadge({ badgeName = "", badgeClass = "", ownerName = "", ownerAddress = "" }): Promise<string> {
		try {
			var contractInstance = await this.getContractInstance();
			var web3ServiceInstance = await (Web3Service.getInstance());
			var account = await web3ServiceInstance.getAccount();
			var result = await contractInstance.issueBadge(
				badgeName, badgeClass, ownerName, ownerAddress,
				{ from: account, gas: 5000000 }
			);

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

	public async getAttribs() {
		try {
			var contractInstance = await this.getContractInstance();

			var result = {
				name: await contractInstance.name(),
				website: await contractInstance.website(),
				email: await contractInstance.email(),
				logoURL: await contractInstance.logoURL(),
				tokenIconURL: await contractInstance.tokenIconURL(),
				about: await contractInstance.about(),
				rewardProgram: new RewardProgram(await contractInstance.rewardProgram())
			}
			console.log("getAttribs", result);
			return result;
		} catch (err) {
			console.warn(err.message);
			throw err;
		}
	}
}
