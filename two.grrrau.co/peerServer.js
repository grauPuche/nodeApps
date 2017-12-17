var PeerServer = require('peer').PeerServer;
var server = PeerServer({
	port: 9000, 
	path: '/peer', 
	proxied: true,
	secure:true,
	debug: 2
})