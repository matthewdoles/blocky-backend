import { Server, Socket } from 'socket.io';
import { lobbies } from '../index.js';
import {
  IClientToServerEvents,
  IServerToClientEvents,
} from '../models/Socket.model.js';

export const updateGameOver = (
  io: Server<IClientToServerEvents, IServerToClientEvents>,
  socket: Socket
) => {
  socket.on('updateGameOver', ({ lobbyId, isOver }, callback) => {
    // Find lobby
    const lobbyIndex = lobbies.findIndex((lobby) => lobby.lobbyId === lobbyId);

    // Return error if no lobby
    if (lobbyIndex == -1) {
      return callback('Cannot find lobby');
    }

    lobbies[lobbyIndex].users.forEach((u) => {
      // Update correct user w/ game over status
      if (u.id === socket.id) {
        u.gameState.isOver = isOver;
      }
    });

    // Send updated user state back to lobby
    io.to(lobbyId).emit('updateLobby', lobbies[lobbyIndex]);
  });
};
