import { Web3Service } from '../web3-service';
import { Contract } from './contract';

export class OrganizationFactory extends Contract {

	/**
	 * @return {string} the contract name
	 */
	public get contractName(): string { return "OrganizationFactory" };

	constructor() { super(); }

	/**
	 * deploy a new token contract
	 * @param retailSymbol a short name usualy 3 chars
	 * @param retailName reward point name
	 * @param retailAmount total points in circulation
	 * @param retailDecimal how many decimal point
	 */
	public async createOrganization({
        name,
		website,
		email,
		logoURL,
		tokenIconURL,
		about,
		tokenInitialAmount,
		tokenName,
		tokenDecimal,
		tokenSymbol
	}) {
		tokenInitialAmount *= Math.pow(10, tokenDecimal);
		try {
			var web3ServiceInstance = await (Web3Service.getInstance());
			var account = await web3ServiceInstance.getAccount();
			var organizationFactoryInst = await this.getContractInstance();

			var result = await organizationFactoryInst.initialiseRetail(
				tokenInitialAmount, tokenName, tokenDecimal, tokenSymbol,
				{ from: account, gas: 5000000 }
			);

			console.log("createOrganization", result);
			return result;
		} catch (err) {
			console.warn(err.message);
			throw err;
		}
	}

	/**
	 * get all token's addresses
	 * @returns {Promise<string[]>}
	 */
	public async getOrganizationsAddresses(): Promise<string[]> {
		try {
			var organizationFactoryInst = await this.getContractInstance();

			var result = await organizationFactoryInst.getOrganizationsAddresses();

			console.log("getOrganizationsAddresses", result);
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
	public async findOrganizationsAddressByOwner(): Promise<string> {
		try {
			var web3ServiceInstance = await (Web3Service.getInstance());
			var account = await web3ServiceInstance.getAccount();
			var organizationFactoryInst = await this.getContractInstance();

			var result = <string>await organizationFactoryInst.findOrganizationsAddressByOwner(account);

			console.log("findOrganizationsAddressByOwner", result);
			return result;

		} catch (err) {
			console.warn(err.message);
			throw err;
		}
	}

}

export interface TokenData {
	address: string;
	name: string;
	symbol: string;
	decimal: number;
}