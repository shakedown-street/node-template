import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import { WebSocketServer } from 'ws';

import { authRouter } from './features/auth/routes';
import { authMiddleware } from './features/auth/middleware';

// Start express server

const server = express();

server.use(cors());

server.use(bodyParser.json());
server.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

server.use(authMiddleware);

server.use('/api/auth', authRouter());

server.listen(3000, () => {
  console.log('Server listening on port 3000');
});

// Start websocket server

const wss = new WebSocketServer({ port: 3030 });

wss.on('listening', () => {
  console.log('WebSocketServer listening on port 3030');
});

wss.on('connection', (ws, req) => {
  console.log(`Client connected`);

  ws.on('error', console.error);

  ws.on('message', (message) => {
    console.log(`Received message => ${message}`);
  });

  ws.on('close', () => {
    console.log(`Client disconnected`);
  });

  ws.send(`Message from server`);
});
