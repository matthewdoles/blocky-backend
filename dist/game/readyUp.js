"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.readyUp = void 0;
const index_js_1 = require("../const/index.js");
const index_js_2 = require("../index.js");
const readyUp = (io, socket) => {
    socket.on('readyUp', (lobbyId, callback) => {
        // Find lobby
        const lobbyIndex = index_js_2.lobbies.findIndex((lobby) => lobby.lobbyId === lobbyId);
        // Return error if no lobby
        if (lobbyIndex == -1) {
            return callback('Cannot find lobby');
        }
        let allUsersReady = true;
        index_js_2.lobbies[lobbyIndex].users.forEach((u) => {
            // Indicate user is ready for new game
            if (u.id === socket.id) {
                u.isReady = true;
            }
            if (!u.isReady)
                allUsersReady = false;
        });
        // Send updated user state back to lobby
        io.to(lobbyId).emit('updateLobby', index_js_2.lobbies[lobbyIndex]);
        if (allUsersReady) {
            io.to(lobbyId).emit('newGame');
            index_js_2.lobbies[lobbyIndex].users.forEach((u) => {
                u.isReady = false;
                u.gameState = {
                    addedPoints: 0,
                    isOver: false,
                    gameBoard: JSON.parse(JSON.stringify(index_js_1.blankGameBoard)),
                    score: 0,
                };
            });
            io.to(lobbyId).emit('updateLobby', index_js_2.lobbies[lobbyIndex]);
        }
    });
};
exports.readyUp = readyUp;
