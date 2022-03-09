import { createServer } from 'http';
import { Server, Socket } from 'socket.io';

import { disconnect } from './standard/disconnect';
import { joinLobby } from './lobby/joinLobby';
import { updateGameOver } from './game/updateGameOver';
import { updateUserGameState } from './game/updateUserGameState';
import { ILobby } from './models/Lobby.model';
import {
  IClientToServerEvents,
  IServerToClientEvents,
} from './models/Socket.model';

const httpServer = createServer();
const io = new Server<IClientToServerEvents, IServerToClientEvents>(
  httpServer,
  {
    cors: {
      origin:
        process.env.NODE_ENV === 'production'
          ? 'https://blocky-beige.vercel.app'
          : 'http://localhost:3000',
    },
  }
);

export const lobbies: ILobby[] = [];

io.on('connection', (socket: Socket) => {
  disconnect(io, socket);
  joinLobby(io, socket);
  updateGameOver(io, socket);
  updateUserGameState(io, socket);
});

const port = process.env.PORT || 8080;
httpServer.listen(port, () => {
  console.log(`listening on *:${port}`);
});
