import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
//import TruffleContract from 'truffle-contract';
import CONFIG from '../../app.config';
import 'rxjs/add/operator/map';
import { Web3Provider } from '../web3/web3';

declare var TruffleContract;
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

  public getBalance(retailAddress?: any) {

    return this.Web3Provider.getAccount().then(account => {

      return this.Contract.deployed().then((loyaltyInstance) => {
        return loyaltyInstance.balanceOf(retailAddress ? retailAddress : account, { from: account });
      }).then(result => {
        console.log("transfered", result);
        return result;
      }).catch(err => {
        console.warn(err.message);
        return err;
      });

    });
  }

  public handleTransfer(amount: number, toAddress: any) {

    return this.Web3Provider.getAccount().then(account => {

      return this.Contract.deployed().then(loyaltyTokenInstance => {
        return loyaltyTokenInstance.transfer(toAddress, amount, { from: account });
      }).then(result => {
        console.log("transfered", result);
        return result;
      }).catch(err => {
        console.warn(err.message);
        return err;
      });
    });
  }

}
