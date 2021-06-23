const http = require('http');

const routes = require('./routes');

const server = http.createServer(routes);

const port = 3000;
server.listen(port);
console.log(`Listening on port ${port}`);