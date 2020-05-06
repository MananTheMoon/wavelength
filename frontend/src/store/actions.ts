import { createAction, ActionType } from "typesafe-actions";
import { IWavelengthData } from "./store";

export const addSocket = createAction("ADD_SOCKET")<SocketIOClient.Socket>();
export const updateGameData = createAction("SET_GAME_DATA")<IWavelengthData>();

export type IActions =
  | ActionType<typeof addSocket>
  | ActionType<typeof updateGameData>;
