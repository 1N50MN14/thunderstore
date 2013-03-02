var store = require('./thunderstore.js');

function ThunderStore(stream) {
	thunderstore = new store(stream);

	Object.defineProperty(thunderstore, 'session',{
	        get: function(){
	            return this.get('session')
	        },
	        set: function(val){
	            this.set('session', val)
	        }
	    });

	return thunderstore;
}	

module.exports = ThunderStore;
