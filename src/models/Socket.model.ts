import { ILobby } from './Lobby.model';
import { IUser } from './User.model';

export interface IServerToClientEvents {
  userLeft: () => void;
  updateLobby: (lobby: ILobby) => void;
}

export interface IClientToServerEvents {
  joinLobby: (
    user: IUser,
    callback: (data: { error: string; user: IUser }) => void
  ) => void;
}
