import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
//import TruffleContract from 'truffle-contract';
import CONFIG from '../../app.config';
import 'rxjs/add/operator/map';
import { Web3Provider } from '../web3/web3';

@Injectable()
export class LoyaltyTokenProvider {

  private _contract;

  constructor(public http: Http, public Web3Provider: Web3Provider) { }

  async getContract() {
    var promise = new Promise((resolve, reject) => {
      if (this._contract) {
        resolve(this._contract);
      } else {
        this.http.get(`${CONFIG.CONTRACTS_URL}/LoyaltyToken.json`).subscribe(data => {
          // Get the necessary contract artifact file and instantiate it with truffle-contract.
          var LoyaltyFactoryArtifact = data.json();
          this._contract = TruffleContract(LoyaltyFactoryArtifact);
          //this._contract = new this.Web3Provider.web3.eth.Contract(LoyaltyFactoryArtifact);
          // Set the provider for our contract.
          this._contract.setProvider(this.Web3Provider.provider);
          resolve(this._contract);
        });
      }

    });
    return promise;
  }

  public async getBalance(tokenAddress?: any) {
    try {
      var contract = <any>await this.getContract();
      var account = await this.Web3Provider.getAccount();
      var loyaltyTokenInstance = tokenAddress ? contract.at(tokenAddress) : await contract.deployed();
      var result = await loyaltyTokenInstance.balanceOf(account);

      console.log("getBalance", result);
      return result;
    } catch (err) {
      console.warn(err.message);
      throw err;
    }
  }

  public async handleTransfer(amount: number, toAddress: any, tokenAddress?: any) {

    try {
      var contract = <any>await this.getContract();
      var account = await this.Web3Provider.getAccount();
      var loyaltyTokenInstance = tokenAddress ? contract.at(tokenAddress) : await contract.deployed();


      var result = await loyaltyTokenInstance.transfer(toAddress, amount, { from: account });

      console.log("handleTransfer", result);
      return result;
    } catch (err) {
      console.warn(err.message);
      throw err;
    }
  }

}
