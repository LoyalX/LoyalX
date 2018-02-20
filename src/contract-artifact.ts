import request = require('request');
import Config from './config';

import * as BadgeProgram from 'loyalx.sol/build/contracts/BadgeProgram.json';
import * as Badge from 'loyalx.sol/build/contracts/Badge.json';
import * as ExtendedRewardProgram from 'loyalx.sol/build/contracts/ExtendedRewardProgram.json';
import * as OrganizationFactory from 'loyalx.sol/build/contracts/OrganizationFactory.json';
import * as Organization from 'loyalx.sol/build/contracts/Organization.json';
import * as RewardProgram from 'loyalx.sol/build/contracts/RewardProgram.json';

export class ContractArtifact {

	static Jsons = {
		BadgeProgram: BadgeProgram,
		Badge: Badge,
		ExtendedRewardProgram: ExtendedRewardProgram,
		OrganizationFactory: OrganizationFactory,
		Organization: Organization,
		RewardProgram: RewardProgram
	}

	/**
	 * 
	 * @param contractName the contract name
	 */
	public static async get(contractName: string): Promise<any> {
		return new Promise((resolve, reject) => {

			var fromLocal = () => {
				this.Jsons[contractName] ? resolve(this.Jsons[contractName]) : reject("the contract name does not exists");
			}

			var fromServer = () => {
				request(
					`${Config.server.CONTRACTS_URL}/${contractName}.json`,
					{ json: true },
					(err, res, body) => {
						err ? fromLocal() : resolve(body)
					}
				);
			}

			return Config.server.CONTRACTS_URL ? fromServer() : fromLocal();
		});
	}
}