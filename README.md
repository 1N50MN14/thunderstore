# thunderstore

Keeps your localStorage in sync with the server and allows for access and manupilation of localStorage directly from the server! 

Thunderstore also exposes a convenient session property (shorthand for .get('session') and .set('session')) so you could store session data in localStorage because [cookies are bad for you](http://sitr.us/2011/08/26/cookies-are-bad-for-you.html)!

## Example

server.js (with shoe)

```javascript
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

client.js (with shoe)
```javascript
var stream = shoe('/sock');
var thunderstore = new ThunderStore(stream);

	thunderstore.set('beep', 'boop')
	thunderstore.session = {user: 'dog'};

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
