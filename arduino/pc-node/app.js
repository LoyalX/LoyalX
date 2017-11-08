const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const SerialPort = require("serialport");

var serialPort = new SerialPort("COM5");

io.on('connection', socket => {
	console.log('client connected');

	var output = "";

	serialPort.on('open', () => {
		console.log('Serial Port Opend');
		serialPort.setEncoding("utf8");
		serialPort.on('data', (data) => {
			for (let i = 0; i < data.length; i++) {
				if (data[i] == "%") {
					if (output.length > 1) {
						console.log(output);
					}

					output = "";
				} else if (data[i] == "&") {
					let serial = output;
					console.log(`serial: ${serial}`);

					io.emit('public-key:sent', { publicKey: serial }); // send the key to the tcp socket
				} else {
					output += data[i];
				}
			}

		});
	});

	socket.on('disconnect', () => {
		console.log('client disconnected');
	});
});

let socketPort = process.env.PORT || 4040;
app.listen(socketPort, () => {
	console.log(`server is listening on port ${socketPort}!`);
})