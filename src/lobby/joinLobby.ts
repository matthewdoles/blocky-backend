import { Server, Socket } from 'socket.io';
import { lobbies } from '../index.js';
import {
  IClientToServerEvents,
  IServerToClientEvents,
} from '../models/Socket.model.js';
import { IUser } from '../models/User.model.js';
import { createLobby } from '../util/index.js';

export const joinLobby = (
  io: Server<IClientToServerEvents, IServerToClientEvents>,
  socket: Socket
) => {
  socket.on(
    'joinLobby',
    ({ id, gameState, profileImage, username }, callback) => {
      // Check valid username
      if (!username) {
        return callback({ error: 'Username required!' });
      }

      // Check for empty lobby
      const lobbyIndex = lobbies.findIndex((l) => l.users.length === 1);

      // Construct User
      const user: IUser = { id: socket.id, username, gameState, profileImage };

      let lobby;
      if (lobbyIndex === -1) {
        lobby = createLobby(user);
      } else {
        lobbies[lobbyIndex].users.push(user);
        lobby = lobbies[lobbyIndex];
      }

      // Join lobby
      socket.join(lobby.lobbyId);

      // Send lobby info to lobby
      io.to(lobby.lobbyId).emit('updateLobby', lobby);
    }
  );
};
