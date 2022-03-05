import { Server, Socket } from 'socket.io';
import { lobbies } from '../index.js';
import {
  IClientToServerEvents,
  IServerToClientEvents,
} from '../models/Socket.model.js';

export const disconnect = (
  io: Server<IClientToServerEvents, IServerToClientEvents>,
  socket: Socket
) => {
  socket.on('disconnect', () => {
    // Check and remove user if actively in game
    lobbies.forEach((lobby, i) => {
      const userIndex = lobby.users.findIndex((u) => u.id === socket.id);
      if (userIndex !== -1) {
        lobbies[i].users.splice(userIndex, 1);
        if (lobbies[i].users.length > 0) {
          io.to(lobbies[i].users[0].id).emit('userLeft');
        }
        lobbies.splice(i, 1);
      }
    });
  });
};
