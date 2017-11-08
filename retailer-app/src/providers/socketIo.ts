import { Injectable } from '@angular/core';
import * as io from 'socket.io-client';

@Injectable()
export class SocketIoService {
	private socket: SocketIOClient.Socket; // The client instance of socket.io
	// Constructor with an injection of ToastService
	constructor() {
		this.socket = io('http://localhost:4040');
	}

	// Consume: on public key sent event
	onPublicKeySent(callback) {
		this.socket.on('public-key:sent', (data) => {
			callback(data.publicKey);
		});
	}
}