#!/usr/bin/env node

var express = require('express'),
  bodyParser = require('body-parser'),
  fs = require('fs'),
  urlparse = require('url-parse'),
  completecdnfinder = require("./lib/cdnfinder.js").completecdnfinder,
  hostnamefinder = require("./lib/hostnamefinder.js").hostnamefinder;

var d = {}


var lineReader = require('readline').createInterface({
  input: require('fs').createReadStream('./lib/detail')
});

lineReader.on('line', function (line) {
  line = line.split(" ")
  d[line[0]] = {'hostname':line[0],'isbase':line[1],'cdn':line[2],'cnames':line[3].split(','),'bytes':line[4],'count':line[5]}
});
lineReader.on('close', () => {
  // console.log(d);
  var app = express();
  app.use(bodyParser.urlencoded({
    extended: true
  }));
  app.use(bodyParser.json());
  app.post('/', function(req, res){
    // console.log(new Date(), req.connection.remoteAddress)
    console.log(req.body.url)
    completecdnfinder(req.body.url,d, function(err, results){
      if(results){
        results.hostname = new urlparse(req.body.url).hostname
        res.send(results);
      } else {
        var hostname = new urlparse(req.body.url).hostname
        res.send({"status": "FAILURE", "hostname": hostname});
      }
    });
  });


  app.post('/hostname/', function(req, res){
    // console.log(new Date(), req.connection.remoteAddress)
    // console.log(new Date(), req.body.hostname);
    hostnamefinder(req.body.hostname, function(response){
      res.send(response);
    })
  });


  app.get('/', function(req, res){
    // console.log(new Date(), req.connection.remoteAddress)
    fs.readFile(__dirname + '/lib/cdnfinder.html',
    function (err, data) {
      if (err) {
        res.writeHead(500);
        return res.end('Error loading cdnfinder.html');
      }
      res.writeHead(200);
      res.end(data);
    });
  });


  app.listen(8888);
});
  //completecdnfinder("http://www.msnbc.com/", function(err, results){
  //  console.dir(results);
  //});
