// Too add more providers, please send pull requests. Make sure to be descriptive.
var CDN_PROVIDER = [
  [".akamai.net", "Akamai"],
  [".akamaized.net", "Akamai"],
  [".akamaiedge.net", "Akamai"],
  [".akamaihd.net", "Akamai"],
  [".edgesuite.net", "Akamai"],
  [".edgekey.net", "Akamai"],
  [".srip.net", "Akamai"],
  [".akamaitechnologies.com", "Akamai"],
  [".akamaitechnologies.fr", "Akamai"],
  [".tl88.net", "Akamai_China_CDN"],
  [".llnwd.net", "Limelight"],
  [".edgecastcdn.net", "Edgecast"],
  [".systemcdn.net", "Edgecast"],
  [".transactcdn.net", "Edgecast"],
  [".v1cdn.net", "Edgecast"],
  [".v2cdn.net", "Edgecast"],
  [".v3cdn.net", "Edgecast"],
  [".v4cdn.net", "Edgecast"],
  [".v5cdn.net", "Edgecast"],
  [".hwcdn.net", "Highwinds"],
  [".simplecdn.net", "SimpleCDN"],
  [".instacontent.net", "MirrorImage"],
  [".footprint.net", "Level3"],
  [".fpbns.net", "Level3"],
  [".ay1.b.yahoo.com", "Yahoo"],
  [".yimg.", "Yahoo"],
  [".yahooapis.com", "Yahoo"],
  [".google.", "Google"],
  [".googlesyndication.", "Google"],
  [".youtube.", "Google"],
  [".googleusercontent.com", "Google"],
  [".googlehosted.com", "Google"],
  [".gstatic.com", "Google"],
  [".doubleclick.net", "Google"],
  [".insnw.net", "InstartLogic"],
  [".inscname.net", "InstartLogic"],
  [".internapcdn.net", "Internap"],
  [".cloudfront.net", "AmazonCloudFront"],
  [".netdna-cdn.com", "NetDNA"],
  [".netdna-ssl.com", "NetDNA"],
  [".netdna.com", "NetDNA"],
  [".kxcdn.com", "KeyCDN"],
  [".cotcdn.net", "CotendoCDN"],
  [".cachefly.net", "Cachefly"],
  [".bo.lt", "BO.LT"],
  [".cloudflare.com", "Cloudflare"],
  [".afxcdn.net", "afxcdn.net"],
  [".lxdns.com", "ChinaNetCenter"],
  [".wscdns.com", "ChinaNetCenter"],
  [".wscloudcdn.com", "ChinaNetCenter"],
  [".ourwebpic.com", "ChinaNetCenter"],
  [".att-dsa.net", "AT&T"],
  [".vo.msecnd.net", "MicrosoftAzure"],
  [".azureedge.net", "MicrosoftAzure"],
  [".voxcdn.net", "VoxCDN"],
  [".bluehatnetwork.com", "BlueHatNetwork"],
  [".swiftcdn1.com", "SwiftCDN"],
  [".cdngc.net", "CDNetworks"],
  [".gccdn.net", "CDNetworks"],
  [".panthercdn.com", "CDNetworks"],
  [".fastly.net", "Fastly"],
  [".fastlylb.net", "Fastly"],
  [".nocookie.net", "Fastly"],
  [".gslb.taobao.com", "Taobao"],
  [".gslb.tbcache.com", "Alimama"],
  [".mirror-image.net", "MirrorImage"],
  [".yottaa.net", "Yottaa"],
  [".cubecdn.net", "cubeCDN"],
  [".cdn77.net", "CDN77"],
  [".cdn77.org", "CDN77"],
  [".incapdns.net", "Incapsula"],
  [".bitgravity.com", "BitGravity"],
  [".r.worldcdn.net", "OnApp"],
  [".r.worldssl.net", "OnApp"],
  [".tbcdn.cn", "Taobao"],
  [".taobaocdn.com", "Taobao"],
  [".ngenix.net", "NGENIX"],
  [".pagerain.net", "PageRain"],
  [".ccgslb.com", "ChinaCache"],
  [".cdn.sfr.net", "SFR"],
  [".azioncdn.net", "Azion"],
  [".azioncdn.com", "Azion"],
  [".azion.net", "Azion"],
  [".cdncloud.net.au", "MediaCloud"],
  [".rncdn1.com", "ReflectedNetworks"],
  [".cdnsun.net", "CDNsun"],
  [".mncdn.com", "Medianova"],
  [".mncdn.net", "Medianova"],
  [".mncdn.org", "Medianova"],
  [".cdn.jsdelivr.net", "jsDelivr"],
  [".nyiftw.net", "NYI_FTW"],
  [".nyiftw.com", "NYI_FTW"],
  [".resrc.it", "ReSRC.it"],
  [".zenedge.net", "Zenedge"],
  [".lswcdn.net", "LeaseWebCDN"],
  [".lswcdn.eu", "LeaseWebCDN"],
  [".revcn.net", "RevSoftware"],
  [".revdn.net", "RevSoftware"],
  [".caspowa.com", "Caspowa"],
  [".twimg.com", "Twitter"],
  [".facebook.com", "Facebook"],
  [".facebook.net", "Facebook"],
  [".fbcdn.net", "Facebook"],
  [".cdninstagram.com", "Facebook"],
  [".rlcdn.com", "Reapleaf"],
  [".wp.com", "WordPress"],
  [".aads1.net", "Aryaka"],
  [".aads-cn.net", "Aryaka"],
  [".aads-cng.net", "Aryaka"],
  [".squixa.net", "section.io"],
  [".bisongrid.net", "BisonGrid"],
  [".cdn.gocache.net", "GoCache"],
  [".hiberniacdn.com", "HiberniaCDN"],
  [".cdntel.net", "Telenor"],
  [".raxcdn.com", "Rackspace"],
  [".unicorncdn.net", "UnicornCDN"],
  [".optimalcdn.com", "OptimalCDN"],
  [".kinxcdn.com", "KINXCDN"],
  [".kinxcdn.net", "KINXCDN"],
  [".stackpathdns.com", "StackPath"],
  [".hosting4cdn.com", "Hosting4CDN"],
  [".netlify.com", "Netlify"],
  [".cdn.bitgravity.com", "Bitgravity"],
  [".clients.turbobytes.com", "Turbobytes"],
  [".cap-mii.net", "MirrorImage"],
  [".l.doubleclick.net", "Google"],
  [".gccdn.cn", "CDNetworks"],
  [".ccgslb.net", "ChinaCache"],
  [".c3cache.net", "ChinaCache"],
  [".chinacache.net", "ChinaCache"],
  [".c3cdn.net", "ChinaCache"],
  [".akadns.net", "Akamai"],
  [".cdn.telefonica.com", "Telefonica"],
  [".anankecdn.com.br", "Ananke"],
];

exports.guesscdnbycname = function(item, callback){
  //var cnames = item.cnames;
  //todo, guess cdn by CNAME chain, leave null if dunno
  var cdn = null;
  var i,j;
  var cnames = item.cnames;
  //cnames.push(item.hostname);
  if (cnames.length > 0){

    for(j=0;j<cnames.length;j++){

      for(i=0;i<CDN_PROVIDER.length;i++){
        if (cnames[j].indexOf(CDN_PROVIDER[i][0]) != -1){
          cdn = CDN_PROVIDER[i][1];
          break;
        }
      }
      if (cdn){
        break;
      }
    }
  }
  //if cdn is still null, use fallback
  if (cdn == null){
    cdn = item.headerguess;
  }
  item.cdn = cdn;
  callback(null, item);
}

//guesscdnbycname({"hostname": "msnbcmedia.msn.com", cnames: ["foo.bar.com", "cdn.example.com"]}, function(err, result){
//  console.log(result)
//})
