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