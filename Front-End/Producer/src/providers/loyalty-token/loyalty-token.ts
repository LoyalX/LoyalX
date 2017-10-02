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

  getBalance(retailAddress: any) {

    // var retailAddress = document.getElementById('retail-address').value;

    console.log(retailAddress);

    var loyaltyInstance;

    this.Web3Provider.web3.eth.getAccounts((error, accounts) => {
      if (error) { console.warn(error); }

      var account = accounts[0];

      this.Contract.deployed().then((instance) => {
        loyaltyInstance = instance;

        return loyaltyInstance.balanceOf(retailAddress, { from: account });
      }).then(result => {
        // return App.markAdopted();
        console.log("success", result.toNumber());
      }).catch(err => console.warn(err.message));

    });
  }

}
