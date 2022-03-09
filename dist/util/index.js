"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateLobbyId = exports.createLobby = void 0;
const __1 = require("..");
const createLobby = (user) => {
    const lobbyId = (0, exports.generateLobbyId)(6);
    const lobbyIndex = __1.lobbies.findIndex((lobby) => lobby.lobbyId === lobbyId);
    if (lobbyIndex != -1) {
        (0, exports.createLobby)(user);
    }
    const lobby = {
        lobbyId: lobbyId,
        users: [user],
    };
    __1.lobbies.push(lobby);
    return lobby;
};
exports.createLobby = createLobby;
const generateLobbyId = (length) => {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
};
exports.generateLobbyId = generateLobbyId;
