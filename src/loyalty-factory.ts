import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
//import TruffleContract from 'truffle-contract';
import CONFIG from '../../app.config';
import 'rxjs/add/operator/map';
import { Web3Provider } from '../web3/web3';

@Injectable()
export class LoyaltyFactoryProvider {

  private _contract;

  constructor(public http: Http, public Web3Provider: Web3Provider) { }

  async getContract() {
    var promise = new Promise((resolve, reject) => {
      if (this._contract) {
        resolve(this._contract);
      } else {
        this.http.get(`${CONFIG.CONTRACTS_URL}/LoyaltyTokenFactory.json`).subscribe(data => {
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

  public async handleOnboard(retailSymbol: string, retailName: string, retailAmount: number, retailDecimal: number) {

    retailAmount *= Math.pow(10, retailDecimal);
    try {
      var contract = <any>await this.getContract();
      var account = await this.Web3Provider.getAccount();
      var loyaltyFactoryInstance = await contract.deployed();

      var result = await loyaltyFactoryInstance.initialiseRetail(retailAmount, retailName, retailDecimal, retailSymbol, { from: account });

      console.log("handleOnboard", result);
      return result;
    } catch (err) {
      console.warn(err.message);
      throw err;
    }
  }

  public async getTokensAddress() {

    try {
      var contract = <any>await this.getContract();
      var loyaltyFactoryInstance = await contract.deployed();

      var result = await loyaltyFactoryInstance.getTokensAddress();

      console.log("getTokensAddress", result);
      return result;

    } catch (err) {
      console.warn(err.message);
      throw err;
    }
  }

  public async getTokensAddressByOwner() {

    try {
      var contract = <any>await this.getContract();
      var account = await this.Web3Provider.getAccount();
      var loyaltyFactoryInstance = await contract.deployed();

      var result = await loyaltyFactoryInstance.getTokensAddressByOwner(account);

      console.log("getTokensAddressByOwner", result);
      return result;

    } catch (err) {
      console.warn(err.message);
      throw err;
    }
  }

  private _parseTokensData(data) {
    var ret = [];

    for (var i = 0; i < data[0].length; i++) {
      ret.push({
        address: data[0][i],
        name: this.Web3Provider.web3.utils.hexToUtf8(data[1][i]),
        symbol: this.Web3Provider.web3.utils.hexToUtf8(data[2][i]),
        decimal: data[3][i].toNumber()
      });
    }

    return ret;
  }

  public async getTokens() {
    try {
      var contract = <any>await this.getContract();
      var loyaltyFactoryInstance = await contract.deployed();

      var result = await loyaltyFactoryInstance.getTokens();

      var ret = this._parseTokensData(result);
      console.log("getTokens", ret);
      return ret;
    } catch (err) {
      console.warn(err.message);
      throw err;
    }
  }
  public async getTokensByOwner() {
    try {
      var contract = <any>await this.getContract();
      var account = await this.Web3Provider.getAccount();
      var loyaltyFactoryInstance = await contract.deployed();

      var result = await loyaltyFactoryInstance.getTokensByOwner(account);

      var ret = this._parseTokensData(result);
      console.log("getTokensByOwner", ret);
      return ret;
    } catch (err) {
      console.warn(err.message);
      throw err;
    }
  }

}
