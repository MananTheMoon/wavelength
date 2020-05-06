import React from "react";
import { connect, useDispatch } from "react-redux";
import { IState, IWavelengthData } from "../store/store";
import { updateGameData } from "../store/actions";

interface IGameUpdateUnconnected {
  socket?: SocketIOClient.Socket;
}

const GameUpdaterUnconnected = ({ socket }: IGameUpdateUnconnected) => {
  const dispatch = useDispatch();
  React.useEffect(() => {
    socket?.on("wavelengthData", (wavelengthData: IWavelengthData) => {
      // console.log(wavelengthData);
      dispatch(updateGameData(wavelengthData));
    });
  }, [socket]);
  return <></>;
};

const mapStateToProps = (state: IState) => ({
  socket: state.socket,
});

export const GameUpdater = connect(mapStateToProps)(GameUpdaterUnconnected);
