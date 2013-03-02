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

	console.log(thunderstore.session);
	console.log(thunderstore.get('boop'))

	thunderstore.on('set', function(args){
		console.log('set from remote!', args);
	}); 
});

sock.install(server, '/sock');
