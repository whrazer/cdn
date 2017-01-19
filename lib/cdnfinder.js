var Step = require("step"),
  feturlhosts = require("./phantomdriver.js").feturlhosts,
  fetchcnamechain = require("./cnamechainfinder.js").fetchcnamechain,
  guesscdnbycname = require("./guesscnamecdn.js").guesscdnbycname;

var dic;
var list = []

exports.completecdnfinder = Step.fn(
  function getresources(url,d) {
    dic = d
    // console.log(d)
    // console.log(new Date(), "Fetching page in phantom.js");
    feturlhosts(url, this);
  },
  function getcnames(err, result){
    if (err) throw err;
    // console.log(new Date(), "Fetching CNAMES");
    var group = this.group();
    var keys = Object.keys(result.resources);
    keys.forEach(function(hostname) {
      if (hostname in dic && hostname != result.basepagehost) {
        list.push(hostname)
      } else {
        fetchcnamechain(result.resources[hostname], group());
      }
    });
  },
  function guesscnamecdn(err , results) {
    // console.log(list)
    if (err) throw err;
    // console.log(new Date(), "Guessing CDN");
    var group = this.group();
    results.forEach(function(result){
      guesscdnbycname(result, group());
    });
  },
  function finalize(err, results){
    if (err) throw err;
    console.log("finaling");
    //sort by count
    results.sort(function(a, b){
      return b.count - a.count
    });
    var output = {}
    output.basecdn = []
    output.cname = []
    output.assetcdn = results[0].cdn;
    for (i=0;i<results.length;i++){
      if (results[i].isbase){
        output.basecdn.push(results[i].cdn);
        output.cname.push(results[i].cnames)
        // break;
      }
    }
    output.basecdn = output.basecdn.filter(function(elem, index, self) {
      return index == self.indexOf(elem);
    })
    output.cname = output.cname.filter(function(elem, index, self) {
      return index == self.indexOf(elem);
    })
    for (var i = list.length - 1; i >= 0; i--) {
      results.push(dic[list[i]])
    }
    // console.log(results)
    output.everything = results;
    return output;
  }
);

// completecdnfinder("http://www.google.com/", function(err, results){
//  console.dir(results);
// });