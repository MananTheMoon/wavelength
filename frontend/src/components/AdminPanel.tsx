import React from "react";
import { connect } from "react-redux";
import { IState, IWavelengthData } from "../store/store";

interface IAdminPanelProps {
  socket?: SocketIOClient.Socket;
  wavelengthData: IWavelengthData;
  teams: string[];
}

const AdminPanelUnconnected = ({
  socket,
  wavelengthData,
  teams,
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
      </div>
      {teams.map((team) => {
        const teamData = wavelengthData.teams[team];
        if (teamData) {
          return (
            <div className="d-flex w-100 justify-content-center mb-2">
              <button
                className="mr-4"
                onClick={() => {
                  socket.emit("setActiveTeam", team);
                }}
              >
                Activate {teamData.name}
              </button>

              <button
                onClick={() => {
                  socket.emit("setTeamScore", team, teamData.score - 1);
                }}
              >
                ⌄
              </button>
              <div className="mx-2 large">{teamData.score}</div>
              <button
                className="mr-4"
                onClick={() => {
                  socket.emit("setTeamScore", team, teamData.score + 1);
                }}
              >
                ⌃
              </button>
              <button
                className="mr-4"
                onClick={() => {
                  socket.emit("setShowTeam", team, !teamData.shown);
                }}
              >
                {teamData.shown ? "Hide" : "Show"}
              </button>
              <button
                onClick={() => {
                  socket.emit("setTeamPosition", team, "left");
                }}
              >
                {"<--"}
              </button>
              <button
                className="mr-4"
                onClick={() => {
                  socket.emit("setTeamPosition", team, "right");
                }}
              >
                {"-->"}
              </button>
            </div>
          );
        }
        return <div>Missing Team?</div>;
      })}
    </>
  );
};

const mapStateToProps = (state: IState) => ({
  socket: state.socket,
  wavelengthData: state.wavelengthData,
});

export const AdminPanel = connect(mapStateToProps)(AdminPanelUnconnected);
