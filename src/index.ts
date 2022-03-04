import { createServer } from 'http';
import { Server, Socket } from 'socket.io';
import {
  ClientToServerEvents,
  ServerToClientEvents,
} from './models/Socket.model';

const httpServer = createServer();
const io = new Server<ClientToServerEvents, ServerToClientEvents>(httpServer, {
  cors: {
    origin:
      process.env.NODE_ENV === 'production' ? '' : 'http://localhost:3000',
  },
});

export const lobbies = [];

io.on('connection', (socket: Socket) => {
  console.log('connected');
});

const port = process.env.PORT || 8080;
httpServer.listen(port, () => {
  console.log(`listening on *:${port}`);
});
