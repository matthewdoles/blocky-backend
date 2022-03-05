"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateUserGameState = void 0;
const index_js_1 = require("../index.js");
const updateUserGameState = (io, socket) => {
    socket.on('updateUserGameState', ({ lobbyId, gameBoard, addedPoints }, callback) => {
        // Find lobby
        const lobbyIndex = index_js_1.lobbies.findIndex((lobby) => lobby.lobbyId === lobbyId);
        // Return error if no lobby
        if (lobbyIndex == -1) {
            return callback('Cannot find lobby');
        }
        index_js_1.lobbies[lobbyIndex].users.forEach((u) => {
            // Update correct user w/ updated game state
            if (u.id === socket.id) {
                u.gameState.gameBoard = gameBoard;
                u.gameState.addedPoints = addedPoints;
                u.gameState.score = u.gameState.score + addedPoints;
            }
        });
        // Send updated user state back to lobby
        io.to(lobbyId).emit('updateLobby', index_js_1.lobbies[lobbyIndex]);
    });
};
exports.updateUserGameState = updateUserGameState;
