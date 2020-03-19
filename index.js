var express = require('express');
app = express();
server = require('http').createServer(app);
io = require('socket.io').listen(server);
 
var SerialPort = require("serialport")//.SerialPort
const ReadLine = SerialPort.parsers.Readline;
var serialPort = new SerialPort("/COM3", { 
    baudRate: 9600 
});

const parser = serialPort.pipe(new ReadLine({ delimiter: '\r\n' }));
 
server.listen(8080);
app.use(express.static('public'));  
var control = 0;   

io.sockets.on('connection', function (socket) {
    socket.on('led', function (led) {
            control = led.value;
            var buf = Buffer.alloc(1);
            buf.writeUInt8(control, 0);
            serialPort.write(buf);
            console.log(control);
            console.log(buf);
    });
    parser.on('data', function (data) {
            io.emit('temp', data.toString());
    });
   
});
console.log(control);
console.log("listening on port 8080");