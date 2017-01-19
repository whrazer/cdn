var Client = require('node-rest-client').Client;
const fs = require('fs');
var json2csv = require('json2csv');
var fields = ['hostname', 'cdn', 'isbase', 'bytes', 'count', 'cnames'];
var csv;
var path = require('path')
// var csvjson = require('csvjson')
var address = process.argv[2]
var sig = process.argv[3]
// console.log(address)
// var dataFile = fs.readFileSync(path.join(__dirname, 'list1m.csv'), { encoding : 'utf8'});
// var websites = csvjson.toColumnArray(dataFile);
var j = 0

try{
    var client = new Client();
    // for(var i = 25; i < 50; i++) {
        // set content-type header and data as json in args parameter 
        
    var args = {
        data: { url: "http://" + address },
        headers: { "Content-Type": "application/json" },
        requestConfig: {
            keepAlive: true,
        }
    };
    
    var req = client.post("http://localhost:8888", args, function (data, response, err) {
        if(data.everything) writeDataEverything(data.everything, args.data.url);
        if(data.basecdn == undefined) {
        	fs.appendFile('failed' +sig, "" + data.hostname + "\n", function(err) {
                if (err) console.log(err);
        	})	
        } else { 
            // console.log(data.cname)
            fs.appendFile('cdn' + sig + '.csv', "" + data.hostname + " " + data.basecdn + "\n", function(err) {
                if (err) console.log(err);
            })
            fs.appendFile('cname' + sig, "" + data.hostname + " " + data.cname + "\n", function(err) {
                if(err) console.log(err);
            });
        }           
    });

    req.on("error",(err) => {
        fs.appendFile('failed' + sig, "" + err.request.options.data.url + "\n", function(err) {
                if (err) console.log(err);
        })
    });
    // }

    // client.on('error', (err) => console.log(err));
} catch(err) {
    console.log(err)
}

function writeDataEverything(data,url) {
    var t;
    fs.appendFile('details' + sig , url + "\n")
    for (var i = data.length - 1; i >= 0; i--) {
        t = data[i];
        fs.appendFile('details' + sig , "" + t.hostname + " " + t.isbase + " " + t.cdn + " " + t.cnames + " " + t.bytes + " " + t.count + " \n", function(err) {
                if (err) console.log(err);
            })
    }
}
