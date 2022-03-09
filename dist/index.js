"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.lobbies = void 0;
const http_1 = require("http");
const socket_io_1 = require("socket.io");
const updateGameOver_1 = require("./game/updateGameOver");
const updateUserGameState_1 = require("./game/updateUserGameState");
const disconnect_1 = require("./standard/disconnect");
const joinLobby_1 = require("./lobby/joinLobby");
const httpServer = (0, http_1.createServer)();
const io = new socket_io_1.Server(httpServer, {
    cors: {
        origin: process.env.NODE_ENV === 'production' ? '' : 'http://localhost:3000',
    },
});
exports.lobbies = [];
io.on('connection', (socket) => {
    (0, disconnect_1.disconnect)(io, socket);
    (0, joinLobby_1.joinLobby)(io, socket);
    (0, updateGameOver_1.updateGameOver)(io, socket);
    (0, updateUserGameState_1.updateUserGameState)(io, socket);
});
const port = process.env.PORT || 8080;
httpServer.listen(port, () => {
    console.log(`listening on *:${port}`);
});
