const http = require('http');
const server = http.createServer();

server.on('request', require('./app'));

server.listen(3001, () => {
  console.log('Server is listening on port 3001!');
})
