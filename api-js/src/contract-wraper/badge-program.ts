import { Web3Service } from '../web3-service';
import { BigNumber } from 'bignumber.js';
import { Contract } from './contract';
import { RewardProgram } from './reward-program';
import { Badge } from './badge';

export class BadgeProgram extends Contract {

	public get contractName() { return "BadgeProgram" };

	public async issue(index, to): Promise<string> {
		try {
			var contractInstance = await this.getContractInstance();
			var web3ServiceInstance = await (Web3Service.getInstance());
			var account = await web3ServiceInstance.getAccount();
			var result = await contractInstance.issue(
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

	public async add({ name = "", metaData = {}, next = "0x0", previous = "0x0" }): Promise<string> {
		try {
			var contractInstance = await this.getContractInstance();
			var web3ServiceInstance = await (Web3Service.getInstance());
			var account = await web3ServiceInstance.getAccount();
			console.log("contract", contractInstance);
			var result = await contractInstance.add(
				name, JSON.stringify(metaData), next, previous,
				{ from: account, gas: 5000000 }
			);

			console.log("add", result);
			return result;
		} catch (err) {
			console.warn(err.message);
			throw err;
		}
	}

	public async getBadges(): Promise<string[]> {
		try {
			var web3ServiceInstance = await (Web3Service.getInstance());
			var contractInstance = await this.getContractInstance();
			var account = await web3ServiceInstance.getAccount();
			var result = await contractInstance.getBadges({ from: account });

			for (const key in result) {
				result[key] = new Badge(result[key]);
			}

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
			var result = await contractInstance.getIssuedBadges(account);

			for (const key in result) {
				result[key] = new Badge(result[key]);
			}

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
				metaData: JSON.parse(await contractInstance.metaData()),
				version: await contractInstance.version()
			};

			console.log("getAttribs", result);
			return result;
		} catch (err) {
			console.warn(err.message);
			throw err;
		}
	}
}
