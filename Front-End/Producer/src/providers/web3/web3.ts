import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import Web3 from 'web3';
import CONFIG from '../../app.config';

declare var web3: any;

@Injectable()
export class Web3Provider {

  private _web3: Web3;
  private _provider;

  constructor(public http: Http) {
    if (typeof web3 !== 'undefined') {
      this._provider = web3.currentProvider;
      this._web3 = new Web3(web3.currentProvider);
    } else {
      this._provider = new Web3.providers.HttpProvider(CONFIG.HTTP_PROVIDER);
      this._web3 = new Web3(this._provider);
    }
  }

  get web3(): Web3 { return this._web3; }
  get provider(): Web3 { return this._provider; }

}
