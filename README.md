# thunderstore

Keeps your localStorage in sync with the server and allows for access and manupilation of localStorage direct from the server! 

Thunderstore also exposes a convenient session property (shorthand for .get('session') and .set('session')) so you could store session data in localStorage because [cookies are bad for you](http://sitr.us/2011/08/26/cookies-are-bad-for-you.html)!

## Example

server.js

```javascript
var http = require('http'),
    ecstatic = require('ecstatic'),
    shoe = require('shoe'),
    ThunderStore = require('../index');

var server = http.createServer(ecstatic({ root: __dirname + '/public' }));
server.listen(5555);

var sock = shoe(function(stream) {
 var thunderstore = new ThunderStore(stream); 

 	 thunderstore.set('boop', 'beep');
	 thunderstore.session = {user: 'cat!'};

	 thunderstore.on('set', function(args){
		console.log('set from remote!', args);
	}); 
});

sock.install(server, '/sock');
```

client.js
```javascript
var shoe = require('shoe'),
    ThunderStore = require('thunderstore');

var stream = shoe('/sock');
var thunderstore = new ThunderStore(stream);

	thunderstore.set('beep', 'boop')
	thunderstore.session = {user: 'dog'};

	console.log(thunderstore.session);
	console.log(thunderstore.get('beep'))

	thunderstore.on('set', function(args){
		console.log('set from remote!', args)
	})
```

## METHODS

## t.set(key, value) / set(key, property, value)
Set value of key on both the server and browser; emits a "set" event on the other end.

## t.get(key, value)
Retrieves value of key

## EVENTS

## t.on('set', function(args) {})
Emitted when a key has been modified due to a remote set 



## TODO / Missing features
- K/V store persistence


## License

MIT
