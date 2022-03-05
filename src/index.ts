import { createServer } from 'http';
import { Server, Socket } from 'socket.io';
import { updateUserGameState } from './game/updateUserGameState';

import { joinLobby } from './lobby/joinLobby';
import { ILobby } from './models/Lobby.model';
import {
  IClientToServerEvents,
  IServerToClientEvents,
} from './models/Socket.model';
import { disconnect } from './standard/disconnect';

const httpServer = createServer();
const io = new Server<IClientToServerEvents, IServerToClientEvents>(
  httpServer,
  {
    cors: {
      origin:
        process.env.NODE_ENV === 'production' ? '' : 'http://localhost:3000',
    },
  }
);

export const lobbies: ILobby[] = [];

io.on('connection', (socket: Socket) => {
  console.log('connected: ' + io.engine.clientsCount);

  disconnect(io, socket);
  joinLobby(io, socket);
  updateUserGameState(io, socket);
});

const port = process.env.PORT || 8080;
httpServer.listen(port, () => {
  console.log(`listening on *:${port}`);
});
