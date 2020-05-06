import {
  createStore as reduxCreateStore,
  Dispatch as ReduxDispatch,
} from "redux";
import socketIOClient from "socket.io-client";
import { addSocket, IActions, updateGameData } from "./actions";
import { getType } from "typesafe-actions";

const server_url = "http://localhost:5000";

export interface IWavelengthData {
  dialAngle: number;
  targetRange: number;
  activeTeam: string;
  covered: boolean;
  prompt: {
    left: string;
    right: string;
  };
}

export interface IState {
  socket?: SocketIOClient.Socket;
  wavelengthData: IWavelengthData;
}

const emptyStore = {
  wavelengthData: {
    dialAngle: 0,
    targetRange: 0,
    activeTeam: "admin",
    covered: true,
    prompt: {
      left: "Left",
      right: "right",
    },
  },
};

function game(state: IState = emptyStore, action: IActions) {
  switch (action.type) {
    case getType(addSocket):
      return {
        ...state,
        socket: action.payload,
      };
    case getType(updateGameData):
      return {
        ...state,
        wavelengthData: action.payload,
      };
  }
}

export const createStore = () => {
  const store = reduxCreateStore(game);
  const socket = socketIOClient(server_url);
  store.dispatch(addSocket(socket));
  return store;
};
export type Dispatch = ReduxDispatch<IActions>;
