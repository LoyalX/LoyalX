import { Web3Service } from '../web3-service';
import { BigNumber } from 'bignumber.js';
import { Contract } from './contract';
import { RewardProgram } from './reward-program';

export class BadgeProgram extends Contract {

	public get contractName() { return "BadgeProgram" };

	public async issue(index, to): Promise<string> {
		try {
			var contractInstance = await this.getContractInstance();
			var web3ServiceInstance = await (Web3Service.getInstance());
			var account = await web3ServiceInstance.getAccount();
			var result = await contractInstance.issueBadge(
				index, to,
				{ from: account, gas: 5000000 }
			);

			console.log("issue", result);
			return result;
		} catch (err) {
			console.warn(err.message);
			throw err;
		}
	}
	public async add({ name = "", rank = "", reason = "", details = "", image = "", styleData = "" }): Promise<string> {
		try {
			var contractInstance = await this.getContractInstance();
			var web3ServiceInstance = await (Web3Service.getInstance());
			var account = await web3ServiceInstance.getAccount();
			var result = await contractInstance.issueBadge(
				name, rank, reason, details, image, styleData,
				{ from: account, gas: 5000000 }
			);

			console.log("add", result);
			return result;
		} catch (err) {
			console.warn(err.message);
			throw err;
		}
	}

	public async getBadges(owner?: string): Promise<string[]> {
		try {
			var web3ServiceInstance = await (Web3Service.getInstance());
			var contractInstance = await this.getContractInstance();
			var account = owner ? owner : (await web3ServiceInstance.getAccount());
			var result = await contractInstance.getBadges({ from: account });

			console.log("getBadges", result);
			return result;
		} catch (err) {
			console.warn(err.message);
			throw err;
		}
	}

	public async getIssuedBadges(owner?: string): Promise<string[]> {
		try {
			var web3ServiceInstance = await (Web3Service.getInstance());
			var contractInstance = await this.getContractInstance();
			var account = owner ? owner : (await web3ServiceInstance.getAccount());
			var result = await contractInstance.issuedBadges(account);

			console.log("getIssuedBadges", result);
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
				version: await contractInstance.version(),
			};

			console.log("getAttribs", result);
			return result;
		} catch (err) {
			console.warn(err.message);
			throw err;
		}
	}
}
