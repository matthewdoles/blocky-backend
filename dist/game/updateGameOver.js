"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateGameOver = void 0;
const index_js_1 = require("../index.js");
const updateGameOver = (io, socket) => {
    socket.on('updateGameOver', ({ lobbyId, isOver }, callback) => {
        // Find lobby
        const lobbyIndex = index_js_1.lobbies.findIndex((lobby) => lobby.lobbyId === lobbyId);
        // Return error if no lobby
        if (lobbyIndex == -1) {
            return callback('Cannot find lobby');
        }
        index_js_1.lobbies[lobbyIndex].users.forEach((u) => {
            // Update correct user w/ game over status
            if (u.id === socket.id) {
                u.gameState.isOver = isOver;
            }
        });
        // Send updated user state back to lobby
        io.to(lobbyId).emit('updateLobby', index_js_1.lobbies[lobbyIndex]);
    });
};
exports.updateGameOver = updateGameOver;
