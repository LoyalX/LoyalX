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
				decimal: await contractInstance.decimals(),
				symbol: await contractInstance.symbol(),
				version: await contractInstance.version()
			};
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
	public async balanceOf(_account?: string, extraParams?): Promise<BigNumber> {
		var web3ServiceInstance = await (Web3Service.getInstance());
		var account = _account ? _account : (await web3ServiceInstance.getAccount());
		return this.genericCall("balanceOf", [account], extraParams);
	}

	/**
	 * 
	 * @param amount amount of tokens to transfer
	 * @param toAddress recipient address
	 */
	public async transfer(amount: number, toAddress: string, extraParams?): Promise<boolean> {
		return this.genericCall("transfer", [amount, toAddress], extraParams);
	}

	/**
	 * @dev Transfer tokens from one address to another
	 * @param from address The address which you want to send tokens from
	 * @param to address The address which you want to transfer to
	 * @param value uint256 the amount of tokens to be transferred
	 */
	public async transferFrom(from: string, to: string, value: number, extraParams?): Promise<boolean> {
		return this.genericCall("transferFrom", [from, to, value], extraParams);
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
	public async approve(spender: string, value, extraParams?): Promise<boolean> {
		return this.genericCall("approve", [spender, value], extraParams);
	}

	/**
	 * @dev Function to check the amount of tokens that an owner allowed to a spender.
	 * @param owner address The address which owns the funds.
	 * @param spender address The address which will spend the funds.
	 * @return A uint256 specifying the amount of tokens still available for the spender.
	 */
	public async allowance(owner: string, spender: string, extraParams?): Promise<BigNumber> {
		return this.genericCall("allowance", [owner, spender], extraParams);
	}

	/**
	 * approve should be called when allowed[spender] == 0. To increment
	 * allowed value is better to use this function to avoid 2 calls (and wait until
	 * the first transaction is mined)
	 * From MonolithDAO Token.sol
	 */
	public async increaseApproval(spender: string, addedValue: number, extraParams?): Promise<boolean> {
		return this.genericCall("increaseApproval", [spender, addedValue], extraParams);
	}

	public async decreaseApproval(spender: string, subtractedValue: number, extraParams?): Promise<boolean> {
		return this.genericCall("decreaseApproval", [spender, subtractedValue], extraParams);
	}

	public async getTransactions(filter?: { from?: string, to?: string }): Promise<any[]> {
		try {
			var contractInstance = await this.getContractInstance();
			var web3ServiceInstance = await (Web3Service.getInstance());
			var account = await web3ServiceInstance.getAccount();
			var event = await contractInstance.Transfer({ _from: account }, { fromBlock: 0, toBlock: 'latest', filter: filter });

			var result = <any[]>await new Promise((resolve, reject) => {
				event.get((error, logs) => error ? reject(error) : resolve(logs));
			});

			console.log("getTransactions", result);
			return result;
		} catch (err) {
			console.warn(err.message);
			throw err;
		}
	}
}
