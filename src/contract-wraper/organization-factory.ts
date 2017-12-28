import { Web3Service } from '../web3-service';
import { Contract } from './contract';
import Config from '../config';
import { ContractArtifact } from '../contract-artifact';

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
		website = "",
		email = "",
		logoURL = "",
		tokenIconURL = "",
		about = "",
		tokenInitialAmount = 1000000000,
		tokenName,
		tokenDecimal = 0,
		tokenSymbol
	}) {
		tokenInitialAmount *= Math.pow(10, tokenDecimal);
		try {
			var web3ServiceInstance = await (Web3Service.getInstance());
			var account = await web3ServiceInstance.getAccount();
			var organizationFactoryInst = await this.getContractInstance();
			var contract = (await ContractArtifact.get(this.contractName));

			/* var nonce = await web3ServiceInstance.web3.eth.getTransactionCount(account);

			// The transaction data follows the format of ethereumjs-tx
			var txOptions = {
				gasPrice: 10000000000000,
				nonce: nonce
			}

			var funcTx = Config.LightWallet.txutils.functionTx(contract.abi, 'createOrganization',
				[
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
				],
				{ from: address, gas: 5000000, to: '0x62227531b82259561cc9ad4413188f08e536598a', nonce: nonce, gasLimit: 555555555555, gasPrice: 1 })

			var pwDerivedKey = await (web3ServiceInstance.wallet._keyFromPassword("password"));

			var signedSetValueTx = Config.LightWallet.signing.signTx(web3ServiceInstance.wallet.keyStore, pwDerivedKey, funcTx, address);

			web3ServiceInstance.web3.eth.sendSignedTransaction(signedSetValueTx).on('receipt', console.log);*/

			var result = await organizationFactoryInst.createOrganization(
				name,
				website,
				email,
				logoURL,
				tokenIconURL,
				about,
				tokenInitialAmount,
				tokenName,
				tokenDecimal,
				tokenSymbol,
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