var	inherits = require('inherits'),
	duplexEmitter = require('duplex-emitter'),
    EventEmitter = require('events').EventEmitter;

module.exports = ThunderStore

function ThunderStore(stream) {
	var self = this;

	this._isServer = (typeof window === 'undefined');
	this._remote = false;
	this.localStore = {};
	this.localStore.session = {};
	this.emitter = duplexEmitter(stream);	
	this.emitter.on('set', function(args) {		
		self._remote = true;
		args.length == 2 ? self.set(args[0], args[1])
						 : self.set(args[0], args[1], args[2])		
		self.emit('set', args);
	});
}

ThunderStore.prototype.set = function() {	
	var self = this, key, value, property = null, args, l;

	args = [].slice.call(arguments);	
	l = args.length;

	if (l == 2) {
		key = args[0];
		value = args[1];
	} else if (l == 3) {
		key = args[0];
		property = args[1];
		value = args[2];
	} else throw new Error('incorrect number of arguments');
		
	property ? self.localStore[key][property] = value
			 : self.localStore[key] = value;

	!self._isServer && window.localStorage.setItem(key, JSON.stringify(self.localStore[key]));

    !self._remote && this.emitter.emit('set', args);

    if (self._remote) self._remote = false;
};

ThunderStore.prototype.get = function(key) {
	if (!key) throw new Error('missing key');		
	return this._isServer ? this.localStore[key]
	      	    	      : JSON.parse(window.localStorage.getItem(key)) || {};
};

inherits(ThunderStore, EventEmitter);