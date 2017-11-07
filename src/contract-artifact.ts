import request = require('request');

export class ContractArtifact {

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