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
	public async createOrganization({
        name,
		metaData = {},
		country = "",
		tokenInitialAmount = 1000000000,
		tokenName,
		tokenDecimal = 0,
		tokenSymbol
	}): Promise<Organization> {
		tokenInitialAmount *= Math.pow(10, tokenDecimal);
		try {
			var web3ServiceInstance = await (Web3Service.getInstance());
			var account = await web3ServiceInstance.getAccount();
			var organizationFactoryInst = await this.getContractInstance();

			var result = await organizationFactoryInst.createOrganization(
				name, country, JSON.stringify(metaData),
				tokenInitialAmount, tokenName, tokenDecimal, tokenSymbol,
				{ from: account, gas: 5000000 }
			);

			console.log("createOrganization", result);
			return new Organization(result);
		} catch (err) {
			console.warn(err.message);
			throw err;
		}
	}

	/**
	 * get all token's addresses
	 * @returns {Promise<Organization[]>}
	 */
	public async getOrganizations(): Promise<Organization[]> {
		try {
			var organizationFactoryInst = await this.getContractInstance();
			var result = await organizationFactoryInst.getOrganizations();

			console.log("getOrganizationsAddresses", result);
			for (const key in result) {
				result[key] = new Organization(result[key]);
			}
			return result;
		} catch (err) {
			console.warn(err.message);
			throw err;
		}
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