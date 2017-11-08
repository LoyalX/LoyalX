const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http);


var SerialPort = require("serialport");

io.on('connection', socket => {


//-----------------serial port Start
var port = new SerialPort("COM5");
//console.log(port);
var output =""
var serial ="";
 port.on('open', function(){
    console.log('Serial Port Opend');
    port.setEncoding("utf8");
    port.on('data', function (data) {
    for(let i =0;i<data.length;i++){
            if(data[i] == "%"){
                if(output.length >1){
                    console.log(output);
                }
                
                output = "";
            }else if(data[i] == "&"){
                serial = output;
                console.log("Serial : "+ serial );
                
io.emit('public-key:sent', { publicKey:serial }); // send the key to the tcp socket
            }else{
                output += data[i] ;
            }
        }
        
      });
  });
//---------------------serialport End




  console.log('client connected');
  socket.on('disconnect', () => {
    console.log('client disconnected');
  });
});

const port = process.env.PORT || 4040;
app.listen(port, () => {
  console.log(`server is listening on port ${port}!`);
})