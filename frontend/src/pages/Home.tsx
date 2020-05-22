import React from "react";
import { connect } from "react-redux";
import { useParams } from "react-router-dom";
import { Stage, Layer, Image } from "react-konva";

import { ImageTargetRange } from "../components/ImageTargetRange";
import { ImageDial } from "../components/ImageDial";
import {
  Background,
  ImageHalfFrame,
  ImageWavelength,
} from "../components/SimpleImages";
import { ImageCover } from "../components/ImageCover";
import { ImageCard } from "../components/ImageCard";
import { TeamPencils } from "../components/ImageTeamPencil";
import { PencilPusher } from "../components/PencilPusher";
import { GameUpdater } from "../components/GameUpdater";
import { AdminPanel } from "../components/AdminPanel";
import { IState, IWavelengthData } from "../store/store";
import { JoinTeam } from "../components/JoinTeam";

const teams = ["team1", "team2", "team3", "team4"];

interface IAdminProps {
  socket?: SocketIOClient.Socket;
  wavelengthData: IWavelengthData;
}
const HomeUnconnected = ({ socket, wavelengthData }: IAdminProps) => {
  const { team } = useParams();
  const [covered, setCovered] = React.useState(true);
  const [targetRange, setTargetRange] = React.useState(0);
  const [adminTranslucency, setAdminTranslucency] = React.useState(false);

  React.useEffect(() => {
    setTargetRange(wavelengthData.targetRange);
    setCovered(wavelengthData.covered);
  }, [wavelengthData]);
  const unlocked = team === wavelengthData.activeTeam || team === "admin";

  return (
    <>
      <div className="w-100 justify-content-center d-flex">
        <Stage width={1200} height={855}>
          <Layer clipHeight={355}>
            <ImageWavelength />
            <ImageTargetRange angle={targetRange} />

            <ImageCover
              covered={covered}
              opacity={team === "admin" && adminTranslucency ? 0.3 : 1}
            />
            <ImageDial
              unlocked={unlocked}
              socket={socket}
              angle={wavelengthData.dialAngle}
            />
            <ImageHalfFrame />
            {!unlocked && teams.includes(team) && (
              <PencilPusher team={team} socket={socket} />
            )}
          </Layer>
          <Layer offsetY={-671} offsetX={-220}>
            <Background />
          </Layer>

          <ImageCard
            left={wavelengthData.prompt.left}
            right={wavelengthData.prompt.right}
          />
          <Layer>
            <TeamPencils teams={teams} wavelengthData={wavelengthData} />
          </Layer>
        </Stage>
      </div>
      {team === "admin" && (
        <div className="d-flex justify-content-center">
          <input
            type="checkbox"
            checked={adminTranslucency}
            onClick={() => {
              setAdminTranslucency(!adminTranslucency);
            }}
          />
          Translucent Cover
        </div>
      )}
      {team === "admin" && <AdminPanel teams={teams} />}
      {!team && <JoinTeam teams={teams} wavelengthData={wavelengthData} />}
      <GameUpdater />
    </>
  );
};

const mapStateToProps = (state: IState) => ({
  socket: state.socket,
  wavelengthData: state.wavelengthData,
});

export const Home = connect(mapStateToProps)(HomeUnconnected);
