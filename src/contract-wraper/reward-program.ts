import { Web3Service } from '../web3-service';
import { BigNumber } from 'bignumber.js';
import { Contract } from './contract';

export class RewardProgram extends Contract {

	public get contractName() { return "RewardProgram" };

	public async getAttribs() {
		try {
			var contractInstance = await this.getContractInstance();

			var result = {
				name: await contractInstance.name(),
				decimal: await contractInstance.decimal(),
				symbol: await contractInstance.symbol(),
				version: await contractInstance.version()
			}
			console.log("getAttribs", result);
			return result;
		} catch (err) {
			console.warn(err.message);
			throw err;
		}
	}

	/**
	 * get the current user balance
	 * @returns {Promise<BigNumber>}
	 */
	public async balanceOf(_account?: string): Promise<BigNumber> {
		try {
			var web3ServiceInstance = await (Web3Service.getInstance());
			var contractInstance = await this.getContractInstance();
			var account = _account ? _account : (await web3ServiceInstance.getAccount());
			var result = await contractInstance.balanceOf(account);

			console.log("balanceOf", result);
			return result;
		} catch (err) {
			console.warn(err.message);
			throw err;
		}
	}

	/**
	 * 
	 * @param amount amount of tokens to transfer
	 * @param toAddress recipient address
	 */
	public async transfer(amount: number, toAddress: string): Promise<boolean> {
		try {
			var contractInstance = await this.getContractInstance();
			var web3ServiceInstance = await (Web3Service.getInstance());
			var account = await web3ServiceInstance.getAccount();
			var result = await contractInstance.transfer(toAddress, amount, { from: account });

			console.log("transfer", result);
			return result;
		} catch (err) {
			console.warn(err.message);
			throw err;
		}
	}

	/**
	 * @dev Transfer tokens from one address to another
	 * @param from address The address which you want to send tokens from
	 * @param to address The address which you want to transfer to
	 * @param value uint256 the amount of tokens to be transferred
	 */
	public async transferFrom(from: string, to: string, value: number): Promise<boolean> {
		try {
			var contractInstance = await this.getContractInstance();
			var web3ServiceInstance = await (Web3Service.getInstance());
			var account = await web3ServiceInstance.getAccount();
			var result = await contractInstance.transferFrom(from, to, value, { from: from });

			console.log("transferFrom", result);
			return result;
		} catch (err) {
			console.warn(err.message);
			throw err;
		}
	}

	/**
	 * @dev Approve the passed address to spend the specified amount of tokens on behalf of msg.sender.
	 *
	 * Beware that changing an allowance with this method brings the risk that someone may use both the old
	 * and the new allowance by unfortunate transaction ordering. One possible solution to mitigate this
	 * race condition is to first reduce the spender's allowance to 0 and set the desired value afterwards:
	 * https://github.com/ethereum/EIPs/issues/20#issuecomment-263524729
	 * @param spender The address which will spend the funds.
	 * @param value The amount of tokens to be spent.
	 */
	public async approve(spender: string, value): Promise<boolean> {
		try {
			var contractInstance = await this.getContractInstance();
			var web3ServiceInstance = await (Web3Service.getInstance());
			var account = await web3ServiceInstance.getAccount();
			var result = await contractInstance.approve(spender, value, { from: account });

			console.log("approve", result);
			return result;
		} catch (err) {
			console.warn(err.message);
			throw err;
		}
	}

	/**
	 * @dev Function to check the amount of tokens that an owner allowed to a spender.
	 * @param owner address The address which owns the funds.
	 * @param spender address The address which will spend the funds.
	 * @return A uint256 specifying the amount of tokens still available for the spender.
	 */
	public async allowance(owner: string, spender: string): Promise<BigNumber> {
		try {
			var contractInstance = await this.getContractInstance();
			var web3ServiceInstance = await (Web3Service.getInstance());
			var account = await web3ServiceInstance.getAccount();
			var result = await contractInstance.allowance(owner, spender, { from: account });

			console.log("allowance", result);
			return result;
		} catch (err) {
			console.warn(err.message);
			throw err;
		}
	}

	/**
	 * approve should be called when allowed[spender] == 0. To increment
	 * allowed value is better to use this function to avoid 2 calls (and wait until
	 * the first transaction is mined)
	 * From MonolithDAO Token.sol
	 */
	public async increaseApproval(spender: string, addedValue: number): Promise<boolean> {
		try {
			var contractInstance = await this.getContractInstance();
			var web3ServiceInstance = await (Web3Service.getInstance());
			var account = await web3ServiceInstance.getAccount();
			var result = await contractInstance.increaseApproval(spender, addedValue, { from: account });

			console.log("increaseApproval", result);
			return result;
		} catch (err) {
			console.warn(err.message);
			throw err;
		}
	}

	public async decreaseApproval(spender: string, subtractedValue: number): Promise<boolean> {
		try {
			var contractInstance = await this.getContractInstance();
			var web3ServiceInstance = await (Web3Service.getInstance());
			var account = await web3ServiceInstance.getAccount();
			var result = await contractInstance.decreaseApproval(spender, subtractedValue, { from: account });

			console.log("decreaseApproval", result);
			return result;
		} catch (err) {
			console.warn(err.message);
			throw err;
		}
	}
}
