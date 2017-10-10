import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import Web3 from 'web3';
import CONFIG from '../../app.config';

@Injectable()
export class Web3Provider {

  private _web3: Web3;
  private _provider: Web3.providers.HttpProvider;

  constructor() {
    if (typeof web3 !== 'undefined') {
      this._provider = web3.currentProvider;
      this._web3 = new Web3(web3.currentProvider);
    } else {
      this._provider = new Web3.providers.HttpProvider(CONFIG.HTTP_PROVIDER);
      this._web3 = new Web3(this._provider);
    }
  }

  get web3(): Web3 { return this._web3; }
  get provider(): Web3.providers.HttpProvider { return this._provider; }

  /**
   * get the first account
   */
  public getAccount(): Promise<any> {
    var promise = new Promise((resolve, reject) => {

      this.web3.eth.getAccounts((error, accounts) => {
        if (error) {
          console.warn(error);
          reject(error);
        } else {
          var account = accounts[0];
          console.log("getAccount", account);
          resolve(account);
        }
      });

    });
    return promise;
  }
}
