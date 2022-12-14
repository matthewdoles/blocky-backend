"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.joinLobby = void 0;
const index_js_1 = require("../index.js");
const index_js_2 = require("../util/index.js");
const joinLobby = (io, socket) => {
    socket.on('joinLobby', ({ id, gameState, profileImage, username }, callback) => {
        // Check valid username
        if (!username) {
            return callback('Username required!');
        }
        // Check for empty lobby
        const lobbyIndex = index_js_1.lobbies.findIndex((l) => l.users.length === 1);
        // Construct User
        const user = {
            id: socket.id,
            username,
            gameState,
            profileImage,
        };
        let lobby;
        if (lobbyIndex === -1) {
            lobby = (0, index_js_2.createLobby)(user);
        }
        else {
            index_js_1.lobbies[lobbyIndex].users.push(user);
            lobby = index_js_1.lobbies[lobbyIndex];
        }
        // Join lobby
        socket.join(lobby.lobbyId);
        // Send lobby info to lobby
        io.to(lobby.lobbyId).emit('updateLobby', lobby);
    });
};
exports.joinLobby = joinLobby;
