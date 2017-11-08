import { Injectable } from '@angular/core';
import * as io from 'socket.io-client';

@Injectable()
export class SocketIoService {
	private socket: SocketIOClient.Socket; // The client instance of socket.io
	// Constructor with an injection of ToastService
	constructor() {
		this.socket = io();
	}

	// Consume: on public key sent event
	onPublicKeySent() {
		this.socket.on('public-key:sent', (data) => {
			console.log(data.publicKey); // data = { publicKey: 'key' }
		});
	}
}