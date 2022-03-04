import { lobbies } from '..';
import { ILobby } from '../models/Lobby.model';
import { IUser } from '../models/User.model';

export const createLobby = (user: IUser) => {
  const lobbyId = generateLobbyNumber(6);
  const lobbyIndex = lobbies.findIndex(
    (lobby: ILobby) => lobby.lobbyId === lobbyId
  );
  if (lobbyIndex != -1) {
    createLobby(user);
  }

  const lobby = {
    lobbyId: lobbyId,
    users: [user],
  };
  lobbies.push(lobby);
  return lobby;
};

export const generateLobbyNumber = (length: number) => {
  let result = '';
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  const charactersLength = characters.length;

  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }

  return result;
};
