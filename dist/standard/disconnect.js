"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.disconnect = void 0;
const index_js_1 = require("../index.js");
const disconnect = (io, socket) => {
    socket.on('disconnect', () => {
        // Check and remove user if actively in game
        index_js_1.lobbies.forEach((lobby, i) => {
            const userIndex = lobby.users.findIndex((u) => u.id === socket.id);
            if (userIndex !== -1) {
                index_js_1.lobbies[i].users.splice(userIndex, 1);
                if (index_js_1.lobbies[i].users.length > 0) {
                    io.to(index_js_1.lobbies[i].users[0].id).emit('userLeft');
                }
                index_js_1.lobbies.splice(i, 1);
            }
        });
    });
};
exports.disconnect = disconnect;
