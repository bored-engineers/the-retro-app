import expressApp from './server';
import http from 'http';
import socketServer from './socket-server';

const server = http.createServer(expressApp);

socketServer.listen(server);

const PORT = process.env.PORT || 3000;

server.listen(PORT, () => { console.log('server started on port: 3000'); });
