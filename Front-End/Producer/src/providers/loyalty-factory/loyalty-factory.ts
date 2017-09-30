import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import TruffleContract from 'truffle-contract';
import CONFIG from '../../app.config';
import 'rxjs/add/operator/map';
import { Web3Provider } from '../web3/web3';

/*
  Generated class for the LoyaltyFactoryProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class LoyaltyFactoryProvider {

  Contract: TruffleContract;

  constructor(public http: Http, public Web3Provider: Web3Provider) {
    this._fetchContract();
    console.log('Hello LoyaltyFactoryProvider Provider');
  }

  private _fetchContract() {
    this.http.get(`${CONFIG.CONTRACTS_URL}/LoyaltyTokenFactory.json`).subscribe(data => {
      // Get the necessary contract artifact file and instantiate it with truffle-contract.
      var LoyaltyFactoryArtifact = data;
      this.Contract = TruffleContract(LoyaltyFactoryArtifact);

      // Set the provider for our contract.
      this.Contract.setProvider(this.Web3Provider.get());
    });
  }

  handleOnboard(retailSymbol: string, retailName: string, retailAmount: number, retailDecimal: number) {

    // var retailSymbol = document.getElementById('retail-symbol').value;
    // var retailName = document.getElementById('retail-name').value;
    // var retailAmount = parseInt(document.getElementById('retail-amount').value, 10);
    // var retailDecimal = parseInt(document.getElementById('retail-decimal').value, 10);

    retailAmount = retailAmount * 10 ^ retailDecimal;


    console.log("Sysmbol: ", retailSymbol, "Name: ", retailName, "Amount: ", retailAmount, " Decimal:", retailDecimal);

    var loyaltyInstance;

    this.Web3Provider.get().eth.getAccounts((error, accounts) => {
      if (error) { console.log(error); }

      console.log(accounts);

      var account = accounts[0];

      this.Contract.deployed().then(function (instance) {
        loyaltyInstance = instance;

        return loyaltyInstance.initialiseRetail(retailAmount, retailName, retailDecimal, retailSymbol, { from: account });
      }).then((result) => {
        // return App.markAdopted();
        console.log("success Address", result);
        // addToLog("#blockchain", "address : " + result);
      }).catch((err) => console.log(err.message));
    });
  }

}
