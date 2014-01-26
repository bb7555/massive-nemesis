{{{
    "title"    : "Creating An Application Internal XML API Endpoint From An External Data Source In NodeJS",
    "tags"     : [ "nodejs", "express", "ejs", "ajax", "building APIs in Node", "Google Maps v3" ],
    "category" : "nodejs",
    "date"     : "01-26-2014"
}}}

Recently, I worked on a project where we needed to translate data from an external XML feed into data for a small Google Maps application integration on a web app. If I had written this web app in PHP, the solution would be to use wget, fopen, or cURL. But this time I used Node JS to make an internal API of the XML feed for my ajax-driven map application. I found no tutorial on this process in Node JS, other than the excellent NodeJS documentation. But the power of the http request library in Node is very powerful. I have set off to write a tut about my narrow need -- creating an internal XML feed of an external data source for my AJAX-driven module.

This tut expects you already have a grasp of the basics of Node JS. I will not be going into any of the devlopment operations or set up. This example requires express and EJS and assumes you can provision these dependencies into your app or use equivalent variants -- e.g. Jade instead of EJS, etc.

Below is the stripped app.js in the top level of the app's directory. As you can see we call all our necessary dependencies and set the express instance to a variable called `app`.

In this example, there are only two routes -- the index page and the XML 'page' which will simply spit out our XML from the external feed. 


```
var express = require('express')
  , routes = require('./routes')
  , http = require('http')
  , path = require('path');

  var app = express();
 
app.set('views', __dirname + '/views');
app.set('view engine', "ejs");
app.engine('ejs', require('ejs').__express);
app.use(express.static(__dirname + '/public'));
app.get("/", function(req, res){
    res.render("index");
});

//app controllers
var externalfeed = require('./controllers/externalfeed.js');

app.get('/xml', externalfeed.XMLFeed);
 
http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
}); 
```
We have encapsulated the logic and code of the feed in a controller file at this location in the app `/controllers/externalfeed.js`. We will examine that file below.

The external feed controller uses the HTTP server and client in NodeJS. We will use the Server Response class. It is quite easy. All the methods of this class can be found here: http://nodejs.org/api/http.html#http_class_http_serverresponse

But, we only need the get and response methods to pull this off. As you can see below, All we do is create an instance of the http server client object. Then we invoke the get method. It accepts several arguments. The first is the URL of the request. The second is the anonymous function that handles the result object from the node server request. 

Basically, as with all express apps in node we have a request and response variable we passed in to the larger controller function, represented as `req, res`, respectively.

As the result object triggers the 'data' event, we can pass the buffered data to our web app's output as raw text `res.write(chunk)`

Finally, just as an aside, we do not have to have the 'end' event with the get method. It is required for the post method, but I included it as a good practice. One could add other expection handling here, too. But, for the sake of simplity of this tut I will not include it.

```
// external feed controller
// ./controllers/externalfeed.js

exports.XMLFeed = function(req, res){
  var http = require('http');
  http.get("http://your.awesome.com/rss-feed", function (result) {
    result.on('data', function (chunk) {
        res.write(chunk);
    });
    result.on('end', function () {
        res.end();
    });
  });
}

```

Last is the view page that pulls the data via AJAX. This example is a hybrid of raw javascript and jQuery. I use raw javscript to request the XML from our web app at '/xml'. I, then, use jQuery to parse the XML and the incredibally well performing `each()` method in jQuery to interate over all the data for our map.

```

<script type="text/javascript"
      src="https://maps.googleapis.com/maps/api/js?key=URKEYHERE&sensor=true">
    </script>
    <%

      function initialize() {
        var mapOptions = {
          center: new google.maps.LatLng(geoplugin_latitude(), geoplugin_longitude()),
          zoom: 10
        };
        var map = new google.maps.Map(document.getElementById("map-canvas"),
            mapOptions);

      xmlhttp=new XMLHttpRequest();
      xmlhttp.open("GET","/xml",false);
      xmlhttp.send();
      var xml = xmlhttp.response,
        $xml = $(xml),
        result = $xml.filter("response").children('results');
      result.children('result').each(function(){
        var infowindow = new google.maps.InfoWindow({
            content: $(this).find('title').text()+" -- "+$(this).find('subtitle').text()+"<br />"+$(this).find('snippet').text()+"<br />"+"<a href='/signups/create?url="+$(this).find('url').text()+"'>Get More Info</a>"
        });
        var marker = new google.maps.Marker({
        position: new google.maps.LatLng($(this).find('latitude').text(), $(this).find('longitude').text()),
        map: map
        });
        google.maps.event.addListener(marker, 'click', function() {
          infowindow.open(map,marker);
        });
      });

      }
      google.maps.event.addDomListener(window, 'load', initialize);
      

    %>

<div id="map-canvas"></div>

``` 

Node JS gives us this beautiful and seamless javascript-centric web app that handles every piece of our request, parse, and presentation to the users of our apps. The fact of the performance boosts and gains one reaps from the Node server adds to the viability of full-stack javascript. I think I'm sold. :)

