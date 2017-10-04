import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
//import TruffleContract from 'truffle-contract';
import CONFIG from '../../app.config';
import 'rxjs/add/operator/map';
import { Web3Provider } from '../web3/web3';

/*
  Generated class for the LoyaltyTokenProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class LoyaltyTokenProvider {

  Contract;

  constructor(public http: Http, public Web3Provider: Web3Provider) {
    this._fetchContract();
    console.log('Hello LoyaltyTokenProvider Provider');
  }

  private _fetchContract() {
    this.http.get(`${CONFIG.CONTRACTS_URL}/LoyaltyToken.json`).subscribe(data => {
      // Get the necessary contract artifact file and instantiate it with truffle-contract.
      var LoyaltyArtifact = data.json();
      this.Contract = TruffleContract(LoyaltyArtifact);

      // Set the provider for our contract.
      this.Contract.setProvider(this.Web3Provider.provider);
    });
  }

  public getBalance(tokenAddress?: any) {

    return this.Web3Provider.getAccount().then(account => {

      // if the token address is passed use it else just use the loyalty token address
      var instancePromice = tokenAddress ? this.Contract.at(tokenAddress) : this.Contract.deployed();

      return instancePromice.then((loyaltyInstance) => {
        return loyaltyInstance.balanceOf(account);
      }).then(result => {
        console.log("getBalance", result);
        return result;
      }).catch(err => {
        console.warn(err.message);
        return err;
      });

    });
  }

  public handleTransfer(amount: number, toAddress: any, tokenAddress?: any) {

    return this.Web3Provider.getAccount().then(account => {

      // if the token address is passed use it else just use the loyalty token address
      var instancePromice = tokenAddress ? this.Contract.at(tokenAddress) : this.Contract.deployed();

      return instancePromice.then(loyaltyTokenInstance => {
        return loyaltyTokenInstance.transfer(toAddress, amount, { from: account });
      }).then(result => {
        console.log("handleTransfer", result);
        return result;
      }).catch(err => {
        console.warn(err.message);
        return err;
      });
    });
  }

}
