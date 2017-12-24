import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

import { Storage } from '@ionic/storage';
import { Connect, SimpleSigner } from 'uport-connect'

/*
  Generated class for the UportProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class UportProvider {


  constructor(public http: Http, public storage: Storage) {
    console.log('Hello UportProvider Provider');
  }

  async requestCredentials() {

    const uport = new Connect('LoyalX', {
      clientId: '2ofupnomVfaXEY8Ueyq43GULkoZjgqEDXCN',
      network: 'rinkeby or ropsten or kovan',
      signer: SimpleSigner('f3fe7e6b5ec60fbbdde4dc67126f77634e631d89f5faf3ef06d9c64a0364d6a6')
    })

    // Request credentials to login
    var cred = await uport.requestCredentials();
    this.storage.set('uPort', cred);

    /*{
      requested: ['name', 'phone', 'country'],
      notifications: true // We want this if we want to recieve credentials
    })*/

    // Attest specific credentials
    /*
    uport.attestCredentials({
      sub: THE_RECEIVING_UPORT_ADDRESS,
      claim: {
        CREDENTIAL_NAME: CREDENTIAL_VALUE
      },
      exp: new Date().getTime() + 30 * 24 * 60 * 60 * 1000, // 30 days from now
    })
*/

    return cred;
  }

  async getCredentials() {
    return await this.storage.get('uPort');
  }

}
