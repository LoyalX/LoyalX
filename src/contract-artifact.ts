import request = require('request');

export class ContractArtifact {

	/**
	 * 
	 * @param contractName the contract name
	 * @param server server info to fetch the contract
	 */
	public static async get(contractName: string, server) {
		return new Promise((resolve, reject) => {
			request(
				`${server.CONTRACTS_URL}/${contractName}.json`,
				{ json: true },
				(err, res, body) => err ? reject(err) : resolve(body)
			);
		});
	}
}