var system = require('system')
var page = require('webpage').create(),
  t, address;
var resources = {};
var domain = require('parse-domain')
var getHostname = function(str) {
  // stollen from http://beardscratchers.com/journal/using-javascript-to-get-the-hostname-of-a-url
  try{
    var re = new RegExp('^(?:f|ht)tp(?:s)?\://([^/]+)', 'im');
    return str.match(re)[1].toString();
  } catch (err) {
    //probably data uri which we dont care abt
    //console.log(str)
    return null;
  }
}

var makeheaderguess = function(headers){
  //Attempt to guess headers off response headers, will use this if DNS can't guess
  var newheaders = {}
  var key, value, i;
  var cdn = null;
  //console.log(JSON.stringify(headers))
  for(i=0;i<headers.length;i++){
    key = headers[i].name.toLowerCase();
    value = headers[i].value.toLowerCase();
//       console.log(key, value)
    newheaders[key] = value;
  }
  //Too add more providers, please send pull requests. Make sure to be descriptive.
  cdn = (newheaders["server"] == "cloudflare" ? "Cloudflare":cdn);
  cdn = (newheaders["server"] == "yunjiasu" ? "Yunjiasu":cdn);
  cdn = (newheaders["server"] == "ECS" ? "Edgecast":cdn);
  cdn = (newheaders["server"] == "ECAcc" ? "Edgecast":cdn);
  cdn = (newheaders["server"] == "ECD" ? "Edgecast":cdn);
  cdn = (newheaders["server"] == "NetDNA" ? "NetDNA":cdn);
  cdn = (newheaders["server"] == "Airee" ? "Airee":cdn);
  cdn = (newheaders["X-CDN-Geo"] ? "OVH CDN":cdn);
  cdn = (newheaders["X-Px"] ? "CDNetworks":cdn);
  cdn = (newheaders["X-Instart-Request-ID"] == "instart" ? "Instart Logic":cdn);
  cdn = (newheaders["Via"] == "CloudFront" ? "AmazonCloudFront":cdn);
  cdn = (newheaders["X-Edge-IP"] ? "CDN":cdn);
  cdn = (newheaders["X-Edge-Location"] ? "CDN":cdn);
  cdn = (newheaders["X-HW"] ? "Highwinds":cdn);
  cdn = (newheaders["X-Powered-By"] == "NYI FTW" ? "NYI FTW":cdn);
  cdn = (newheaders["server"] == "ReSRC" ? "ReSRC.it":cdn);
  cdn = (newheaders["X-Cdn"] == "Zenedge" ? "Zenedge":cdn);
  cdn = (newheaders["server"] == "leasewebcdn" ? "LeaseWeb CDN":cdn);
  cdn = (newheaders["Via"] == "Rev-Cache" ? "Rev Software":cdn);
  cdn = (newheaders["X-Rev-Cache"] ? "Rev Software":cdn);
  cdn = (newheaders["Server"] == "Caspowa" ? "Caspowa":cdn);
  cdn = (newheaders["Server"] == "SurgeCDN" ? "Surge":cdn);
  cdn = (newheaders["server"] == "sffe" ? "Google":cdn);
  cdn = (newheaders["server"] == "cloudflare-nginx" ? "Cloudflare":cdn);
  cdn = (newheaders["server"] == "gws" ? "Google":cdn);
  cdn = (newheaders["server"] == "GSE" ? "Google":cdn);
  cdn = (newheaders["server"] == "Golfe2" ? "Google":cdn);
  cdn = (newheaders["server"] == "tsa_b" ? "Twitter":cdn);
  cdn = (newheaders["X-Cache"] == "cache.51cdn.com" ? "ChinaNetCenter":cdn);
  cdn = (newheaders["X-CDN"] == "Incapsula" ? "Incapsula":cdn);
  cdn = (newheaders["X-Iinfo"] ? "Incapsula":cdn);
  cdn = (newheaders["X-Ar-Debug"] ? "Aryaka":cdn);
  cdn = (newheaders["server"] == "gocache" ? "GoCache":cdn);
  cdn = (newheaders["server"] == "hiberniacdn" ? "HiberniaCDN":cdn);
  cdn = (newheaders["server"] == "UnicornCDN" ? "UnicornCDN":cdn);
  cdn = (newheaders["server"] == "Optimal CDN" ? "OptimalCDN":cdn);
  cdn = (newheaders["server"] == "Sucuri/Cloudproxy" ? "Sucuri/Cloudproxy":cdn);
  cdn = (newheaders["server"] == "Netlify" ? "Netlify":cdn);
  cdn = (newheaders["section-io-id"] ? "section.io":cdn);
  //Cloudflare advertises a custom Server header
  cdn = (newheaders["server"] == "cloudflare-nginx" ? "Cloudflare":cdn);
  //China cache sends a Powered-By-Chinacache header
  cdn = (newheaders["powered-by-chinacache"] ? "ChinaCache":cdn);
  //OnApp edge servers use X-Edge-Location to indicate the location
  cdn = (newheaders["x-edge-location"] ? "OnApp":cdn);
  //CloudFront adds in some custom tracking id
  cdn = (newheaders["x-amz-cf-id"] ? "AmazonCloudFront":cdn);
  //Bitgravity adds edge hostname to Via header
  cdn = (newheaders["via"] && (newheaders["via"].indexOf("bitgravity.com") != -1)  ? "Bitgravity":cdn);
  return cdn;
}


var makereport = function(input){
  var key, keys, basepagedomain, output, i;
   console.log("making report")
  keys = Object.keys(input.resources);
  //console.log(JSON.stringify(keys))
  
  var mydomain = domain(input.basepagehost).domain
  for (i=0;i<keys.length;i++){
    key = keys[i];
    input.resources[key].headerguess = makeheaderguess(input.resources[key].headers);
    input.resources[key].isbase = key.indexOf(mydomain) != -1;
    input.resources[key].hostname = key;
    //delete input.resources[key].headers;
  }
  //nodejs app reads from console
  console.log(JSON.stringify(input));
}


t = Date.now();
address = system.args[1];
console.log(address)
page.onResourceReceived = function(request){
  var url, size, hostname, headers, i;
  var headers = request.headers;
//        console.log(JSON.stringify(request));
  url = request.url;
  if (!(size)){
    size = (request.bodySize ? request.bodySize: 0);
  }
  //console.log(url); 
  hostname = getHostname(url);
  if ((hostname) && (size > 0)){
    if (!(resources[hostname])){
      resources[hostname] = {};
      resources[hostname].count = 0;
      resources[hostname].bytes = 0;
    }
    resources[hostname].count += 1;
    //phantomjs lies! so we see content-length header is available
    for (i=0;i<headers.length;i++){
      if (headers[i].name.toLowerCase() == "content-length"){
        size = parseInt(headers[i].value);
        break;
      }
    }

    resources[hostname].bytes += size;
    //save the last response headers per host
    resources[hostname].headers = headers;
  }
}
page.open(address, function (status) {
  var output;
  if (status !== 'success') {
    console.log('{"error": "FAIL"}');
  } else {
    t = Date.now() - t;
//            console.log('Loading time ' + t + ' msec');
    output = {};
    output.basepagehost = page.evaluate(function () {
        return document.location.hostname;
    });
    
    output.resources = resources;
    makereport(output);
    //console.log(JSON.stringify(output));
  }
  phantom.exit();
});
