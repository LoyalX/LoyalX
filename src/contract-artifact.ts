import request = require('request');
import Config from './config';

export class ContractArtifact {

	/**
	 * 
	 * @param contractName the contract name
	 * @param server server info to fetch the contract
	 */
	public static async get(contractName: string): Promise<any> {
		return new Promise((resolve, reject) => {
			request(
				`${Config.server.CONTRACTS_URL}/${contractName}.json`,
				{ json: true },
				(err, res, body) => err ? reject(err) : resolve(body)
			);
		});
	}
}