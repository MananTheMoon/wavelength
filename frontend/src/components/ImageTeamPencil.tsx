import React from "react";
import { Image, Layer, Text } from "react-konva";
import useImage from "use-image";
import { IWavelengthData, ITeamData } from "../store/store";

const positionOffsets = {
  left: {
    x: 120,
    y: 0,
    increment: -125,
  },
  center: {
    x: -440,
    y: 0,
    increment: -125,
  },
  right: {
    x: -1210,
    y: 0,
    increment: 125,
  },
};

interface ITeamPencilsProps {
  teams: string[];
  wavelengthData: IWavelengthData;
  // socket?: SocketIOClient.Socket;
}

export const TeamPencils = ({ teams, wavelengthData }: ITeamPencilsProps) => {
  const baseAcc: {
    left: ITeamData[];
    center: ITeamData[];
    right: ITeamData[];
  } = {
    left: [],
    center: [],
    right: [],
  };
  const teamsByPosition = teams.reduce((acc, teamKey) => {
    const team = wavelengthData.teams[teamKey];
    if (team && team.shown) {
      acc[team.position].push(team);
    }
    return acc;
  }, baseAcc);

  console.log(teamsByPosition);
  return (
    <>
      {teamsByPosition.left.map((team, i) => {
        console.log("getting here");
        return (
          <ImagePencil
            score={team.score}
            name={team.name}
            offsetX={
              positionOffsets.left.x + positionOffsets.left.increment * (i + 1)
            }
            offsetY={positionOffsets.left.y}
          />
        );
      })}
      {teamsByPosition.center.map((team, i) => {
        console.log("getting here");
        return (
          <ImagePencil
            score={team.score}
            name={team.name}
            offsetX={
              positionOffsets.center.x +
              positionOffsets.center.increment * (i + 1)
            }
            offsetY={positionOffsets.center.y}
          />
        );
      })}
      {teamsByPosition.right.map((team, i) => {
        console.log("getting here");
        return (
          <ImagePencil
            score={team.score}
            name={team.name}
            offsetX={
              positionOffsets.right.x +
              positionOffsets.right.increment * (i + 1)
            }
            offsetY={positionOffsets.right.y}
          />
        );
      })}
    </>
  );
};

interface IPencilProps {
  name: string;
  score: number;
  // position: "left" | "center" | "right";
  offsetX?: number;
  offsetY?: number;
}
export const ImagePencil = ({
  name,
  score,
  offsetX = 0,
  offsetY = 0,
}: IPencilProps) => {
  const [img] = useImage(require("../img/team-pencil-down.png"));
  return (
    <>
      <Image
        image={img}
        width={100}
        height={130}
        offsetX={offsetX}
        offsetY={offsetY}
      />
      <Text
        offsetX={offsetX}
        align="center"
        width={100}
        offsetY={offsetY - 22}
        text={String(score)}
        fontSize={20}
      />
      <Text
        offsetX={offsetX}
        align="center"
        width={100}
        offsetY={offsetY - 55}
        text={name}
        fontSize={20}
      />
    </>
  );
};
