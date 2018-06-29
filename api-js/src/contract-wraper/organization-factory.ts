import { Web3Service } from '../web3-service';
import { Contract } from './contract';
import { Organization } from './organization';

export class OrganizationFactory extends Contract {

	public get contractName(): string { return "OrganizationFactory" };

	/**
	 * deploy a new token contract
	 * @param retailSymbol a short name usualy 3 chars
	 * @param retailName reward point name
	 * @param retailAmount total points in circulation
	 * @param retailDecimal how many decimal point
	 */
	public async create({ name = "", metaData = {}, country = "" }, extraParams?): Promise<Organization> {
		extraParams = extraParams || { gas: 5000000 };
		extraParams.gas = extraParams.gas || extraParams.gas == 5000000;

		return this.genericCall("create", [name, country, JSON.stringify(metaData)], extraParams);
	}

	/**
	 * get all token's addresses
	 * @returns {Promise<Organization[]>}
	 */
	public async getOrganizations(extraParams?): Promise<Organization[]> {

		var result = this.genericCall("getOrganizations", [], extraParams)

		for (const key in result) {
			result[key] = new Organization(result[key]);
		}
		return result;
	}


	/**
	 * get all token's addresses created by the user account
	 * @returns {Promise<string[]>}
	 */
	public async findOrganizationByOwner(owner?: string): Promise<Organization> {
		try {
			var web3ServiceInstance = await (Web3Service.getInstance());
			var account = owner ? owner : (await web3ServiceInstance.getAccount());
			var organizationFactoryInst = await this.getContractInstance();

			var result = <string>await organizationFactoryInst.ownerMap(account);

			console.log("findAddressByOwner", result);
			return new Organization(result);
		} catch (err) {
			console.warn(err.message);
			throw err;
		}
	}
}