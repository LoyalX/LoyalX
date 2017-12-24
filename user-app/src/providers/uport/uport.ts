import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

import { Storage } from '@ionic/storage';
import { Connect } from 'uport-connect'

/*
  Generated class for the UportProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class UportProvider {

  uPort = new Connect('LoyalX');

  constructor(public http: Http, public storage: Storage) {
    console.log('Hello UportProvider Provider');
  }

  async requestCredentials() {

    var cred = await this.uPort.requestCredentials({
      requested: ['name', 'country']
    });

    this.storage.set('uPort', cred);

    return cred;
  }

  async getCredentials() {
    return await this.storage.get('uPort');
  }

}
