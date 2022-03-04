"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.lobbies = void 0;
const http_1 = require("http");
const socket_io_1 = require("socket.io");
const httpServer = (0, http_1.createServer)();
const io = new socket_io_1.Server(httpServer, {
    cors: {
        origin: process.env.NODE_ENV === 'production' ? '' : 'http://localhost:3000',
    },
});
exports.lobbies = [];
io.on('connection', (socket) => {
    console.log('connected');
});
const port = process.env.PORT || 8080;
httpServer.listen(port, () => {
    console.log(`listening on *:${port}`);
});
