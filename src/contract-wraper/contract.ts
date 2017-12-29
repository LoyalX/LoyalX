import { Web3Service } from '../web3-service';

export abstract class Contract {

    protected _address: string;

    public get address(): string { return this._address; }

    constructor(address?: string) {
        this._address = <any>address;
    }

	/**
	 * @return {string} the contract name
	 */
    public get contractName(): string { return ""; }

	/**
	 * @return {TruffleContract} the contract
	 */
    public async getContract() {
        var web3ServiceInstance = await (Web3Service.getInstance());
        return web3ServiceInstance.getContract(this.contractName);
    }

	/**
	 * @return {TruffleContract Instance} the contract instance
	 */
    public async getContractInstance() {
        var contract = await this.getContract();
        return this.address ? contract.at(this.address) : contract.deployed();
    }

}