{{{
    "title"    : "Basic Socket.IO App With EJS (part 1)",
    "tags"     : [ "nodejs", "socket.io", "ejs", "webRTC" ],
    "category" : "nodejs",
    "date"     : "01-17-2014"
}}}

NodeJS has a real advantage in Real-Time Web Communications (webRTC). If you like to develop on the back-end with javascript, as I do, then power of socket.io has probably been something of interest. Since I prefer to use the EJS templating engine and I have found no good tuts using EJS with socket.io, in terms of basic tutorials, I have decided to create one.

All code in this tut is available here: https://github.com/bb7555/socketio-express-ejs

## Before We Begin ##

This assumes you have a basic to intermediate understanding of NodeJS. That being said, I assume you are working on a machine that has nodeJS installed on it already. 

If you have not a clue, not to worry, start here first: http://nodejs.org/

## Provision The Environment ##

First, we need to create our `package.json` file:

```{
    "name": "RealTimeWebChat",
    "version": "0.0.0",
    "description": "Real time web chat",
    "dependencies": {
        "socket.io": "latest",
        "express": "latest",
        "ejs": "latest"
    },
    "author": "developer"
}```

Save that file. Also, at this point you will also want to create a folder called 'public' and 'views' in this directory too.

Next run the following command from the CLI: `sudo npm install`

This will provision your environment and you will be ready to develop your first socket.io app. If you cloned my git hub repository, then ran that command, you should be ready to run the app. Just type: `nodejs index`

## Building The NodeJS Chat Server With Socket.io ##

Let’s begin with a simple server, which will deliver the application's HTML page, and then continue with the more interesting bits: the real time communication. Create an index.js file with the following core expressjs code:

```
var express = require("express");
var app = express();
var port = 3700;
 
app.get("/", function(req, res){
    res.send("It works!");
});
 
app.listen(port);
console.log("Listening on port " + port);
```

Above, we’ve created an application and defined its port. Next, we registered a route, which, in this case, is a simple GET request without any parameters. For now, the route’s handler simply sends some text to the client. Finally, of course, at the bottom, we run the server. To initialize the application, from the console, execute: `nodejs index`

The server is running, so you should be able to open http://localhost:3700/ and see: `It works`

Now we want add our EJS front-end template. You will want to create a file called `index.ejs` and place it in your 'views' directory. This is the code:

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

EJS's syntax is not so complex, but, for a full guide, I suggest that you refer to http://embeddedjs.com/. In order to use EJS with ExpressJS, we require the following settings.

```
app.set('views', __dirname + '/views');
app.set('view engine', "ejs");
app.engine('ejs', require('ejs').__express);
app.use(express.static(__dirname + '/public'));
app.get("/", function(req, res){
    res.render("index");
});
```

Because we will use an external JavaScript file that will hold the front-end logic, we need to inform ExpressJS where to look for such resources. Create an empty directory, public, and add the following line before the call to the .listen method.

`app.use(express.static(__dirname + '/public'));`

So far so good; we have a server that successfully responds to GET requests. Now, it’s time to add Socket.io integration. Change this line:

`app.listen(port);`

to:

```
var io = require('socket.io').listen(app.listen(port));
```

Above, we passed the ExpressJS server to Socket.io. In effect, our real time communication will still happen on the same port.

Moving forward, we need to write the code that will receive a message from the client, and send it to all the others. Every Socket.io application begins with a connection handler. We should have one:

```
io.sockets.on('connection', function (socket) {
    socket.emit('message', { message: 'welcome to the chat' });
    socket.on('send', function (data) {
        io.sockets.emit('message', data);
    });
});
```

The object, socket, which is passed to your handler, is actually the socket of the client. Think about it as a junction between your server and the user's browser. Upon a successful connection, we send a welcome type of message, and, of course, bind another handler that will be used as a receiver. As a result, the client should emit a message with the name, send, which we will catch. Following that, we simply forward the data sent by the user to all other sockets with io.sockets.emit.

In the next post, we will finish up using EJS and javascript to make this chat app work.