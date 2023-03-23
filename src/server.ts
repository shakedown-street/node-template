import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import { WebSocketServer } from 'ws';

import { authRouter } from './features/auth/routes';
import { authMiddleware } from './features/auth/middleware';

const server = express();
const wss = new WebSocketServer({ port: 8080 });

server.use(cors());

server.use(bodyParser.json());
server.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

server.use(authMiddleware);

server.use('/api/auth', authRouter());

wss.on('connection', (ws, req) => {
  console.log(`Client connected => ${req.socket.remoteAddress}`);

  ws.on('error', console.error);

  ws.on('message', (message) => {
    console.log(`Received message => ${message}`);
  });

  ws.send('Message from server');
});

server.listen(3000, () => {
  console.log('Server listening on port 3000');
});
