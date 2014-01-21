{{{
    "title"    : "Basic Socket.IO App With EJS (part 2)",
    "tags"     : [ "nodejs", "socket.io", "ejs", "webRTC" ],
    "category" : "nodejs",
    "date"     : "01-21-2014"
}}}

In the previous post we built out the back-end of our nodeJS/socket.io app. In this post we will finish up this basic tutorial by building the front-end. We will be using Embedded Javascript (EJS) and Express to bake the functionality into the app for the user.

I already gave the ejs template in the last post. It will go in our views folder. Our main app file has all the routes to complete this task:

```
var express = require("express");
var app = express();
var port = 3700;
 
app.set('views', __dirname + '/views');
app.set('view engine', "ejs");
app.engine('ejs', require('ejs').__express);
app.use(express.static(__dirname + '/public'));
app.get("/", function(req, res){
    res.render("index");
});
 
var io = require('socket.io').listen(app.listen(port));
io.sockets.on('connection', function (socket) {
    socket.emit('message', { message: 'welcome to the chat' });
    socket.on('send', function (data) {
        io.sockets.emit('message', data);
    });
});
console.log("Listening on port " + port); 
```

The part that is important for our front-end is `app.get("/", function(req, res){res.render("index");});

The `app` variable is the instance of Express in the app. Express will the route all get requests to the top level of the app (or '/') to the index.ejs file in our views directory. 

Let's look at index.ejs

```
<html>
        <head>
                <title>Real time web chat</title>
                <script src='/chat.js' type='text/javascript'></script>
                <script src='/socket.io/socket.io.js' type='text/javascript'></script>
        <body>
                <div id='content' style='width: 500px; height: 300px; margin: 0 0 20px 0; border: solid 1px #999; overflow-y: scroll;'></div>
                        <div class="controls">
                                | Name:
                                <input id='name' style='width:350px' />
                                <br />
                                <input id='field' style='width:350px;' />
                                <input id='send' type='button' value='send' />
                        </div>
                
        </body>
</html>
```

When we first fire up the app, the server should send us a message: 'Welcome to the chat' Then, we can fill our name in the name input dialog and post our chat messages in the input field below that.

But at this point it doesn't work (unless you cloned my repo). There are two javascript dependencies to address.

First is the '/socket.io/socket.io.js' dependency. This is just something that you should put on all you webRTC apps with socket.io. Node and socket.io will handle this for us. You will notice there is no socket.io.js file in the public directory.  But, we need to place this on all sections of the app that will depend on socket.io for its functionality.

The other dependency is 'chat.js'. We will need to write this (or clone it from github):

```
window.onload = function() {
 
    var messages = [];
    var socket = io.connect('http://localhost:3700');
    var field = document.getElementById("field");
    var sendButton = document.getElementById("send");
    var content = document.getElementById("content");
    var name = document.getElementById("name");
 
    socket.on('message', function (data) {
        if(data.message) {
            messages.push(data);
            var html = '';
            for(var i=0; i<messages.length; i++) {
                html += '<b>' + (messages[i].username ? messages[i].username : 'Server') + ': </b>';
                html += messages[i].message + '<br />';
            }
            content.innerHTML = html;
        } else {
            console.log("There is a problem:", data);
        }
    });
 
    sendButton.onclick = function() {
        if(name.value == "") {
            alert("Please type your name!");
        } else {
            var text = field.value;
            socket.emit('send', { message: text, username: name.value });
        }
    };
 
}
``` 

The entire file is wrapped in a `window.onload` anonymous function. Obviously, we could also use jQuery here or any type of javascript library or helper classes we want. I will, for simplicity, use raw javascript only.

We set our messages to be passed as an empty array and create an instance of socket.io as 'socket'. The other variables are simply caching DOM objects.

Within the main function there are only two anonymous event listener functions. The first one is listening at the server for a message. When a message is received it is parsed and injected into the `div#content` element in the DOM. The other function is simply an event handler that submits our message to the chat server when the send button is clicked.

Once we post a message to the server, it will return on our screen.

If others happened to be on our same wired or wireless network, we could chat with them if they connected to our computer over the network on port 3700. Really sweet!

NodeJS is an extremely useful technology, and provides us with a great deal of power and joy, especially when considering the fact that we can write pure JavaScript. As you can see, with only a few lines of code, we managed to write a fully functional real time chat application.