import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import Web3 from 'web3';
import CONFIG from '../../app.config';

declare var web3: any;

@Injectable()
export class Web3Provider {

  private web3: any;

  constructor(public http: Http) {
    if (typeof web3 !== 'undefined') {
      this.web3 = new Web3(web3.currentProvider);
    } else {
      this.web3 = new Web3(new Web3.providers.HttpProvider(CONFIG.HTTP_PROVIDER));
    }
  }

  get() {
    return this.web3;
  }

}
