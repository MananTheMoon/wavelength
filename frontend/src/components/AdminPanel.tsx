import React from "react";
import { connect } from "react-redux";
import { IState, IWavelengthData } from "../store/store";

interface IAdminPanelProps {
  socket?: SocketIOClient.Socket;
  wavelengthData: IWavelengthData;
}

const AdminPanelUnconnected = ({
  socket,
  wavelengthData,
}: IAdminPanelProps) => {
  const [leftPromptInput, setLeftPromptInput] = React.useState(
    wavelengthData.prompt.left
  );
  const [rightPromptInput, setRightPromptInput] = React.useState(
    wavelengthData.prompt.right
  );
  return (
    <>
      <div className="d-flex w-100 justify-content-center mb-2">
        <button
          onClick={() => {
            socket.emit("setCovered", !wavelengthData.covered);
          }}
        >
          Show/Hide
        </button>
        <button
          onClick={() => {
            const newTarget = Math.random() * 156 - 77;
            socket.emit("setTargetRange", newTarget);
          }}
        >
          Randomize
        </button>
      </div>

      <div className="d-flex w-100 justify-content-center mb-2">
        <input
          type="text"
          placeholder="Question"
          className="mr-2"
          value={leftPromptInput}
          onChange={(e) => {
            setLeftPromptInput(e.target.value);
          }}
        ></input>
        <input
          type="text"
          placeholder="Question"
          className="mr-2"
          value={rightPromptInput}
          onChange={(e) => {
            setRightPromptInput(e.target.value);
          }}
        ></input>

        <button
          onClick={() => {
            socket.emit("setPrompt", {
              left: leftPromptInput,
              right: rightPromptInput,
            });
          }}
        >
          Set Prompts
        </button>
      </div>
      <div className="d-flex w-100 justify-content-center mb-2">
        <button
          onClick={() => {
            socket.emit("setActiveTeam", "admin");
          }}
        >
          Admin Control
        </button>

        <button
          onClick={() => {
            socket.emit("setActiveTeam", "team1");
          }}
        >
          Team 1
        </button>

        <button
          onClick={() => {
            socket.emit("setActiveTeam", "team2");
          }}
        >
          Team 2
        </button>

        <button
          onClick={() => {
            socket.emit("setActiveTeam", "team3");
          }}
        >
          Team 3
        </button>
      </div>
    </>
  );
};

const mapStateToProps = (state: IState) => ({
  socket: state.socket,
  wavelengthData: state.wavelengthData,
});

export const AdminPanel = connect(mapStateToProps)(AdminPanelUnconnected);
