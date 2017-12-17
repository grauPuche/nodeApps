var PeerServer = require('peer').PeerServer;
var server = PeerServer({
	port: 7002, 
	path: '/peer', 
	proxied: true,
	secure:true,
	debug: 2
})