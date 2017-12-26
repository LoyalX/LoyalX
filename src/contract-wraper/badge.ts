import { Web3Service } from '../web3-service';
import { BigNumber } from 'bignumber.js';
import { Contract } from './contract';

export class Badge extends Contract {

	constructor(address: string) {
		super();
		this._address = address;
	}

	public get contractName() { return "Badge" };

	
}
