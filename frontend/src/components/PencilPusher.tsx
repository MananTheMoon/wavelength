import React from "react";
import { Image } from "react-konva";
import useImage from "use-image";

interface IPencilPusherProps {
  team: string;
  socket?: SocketIOClient.Socket;
}

export const PencilPusher = ({ team, socket }: IPencilPusherProps) => {
  const [pencilLeft] = useImage(require("../img/pencil-left.png"));
  const [pencilRight] = useImage(require("../img/pencil-right.png"));
  return (
    <>
      <Image
        image={pencilLeft}
        width={150}
        height={100}
        offsetY={-300}
        onMouseEnter={(e) => {
          console.log("cursor enter");
          document.body.style.cursor = "pointer";
        }}
        onMouseLeave={(e) => {
          console.log("cursor enter");
          document.body.style.cursor = "default";
        }}
        onClick={() => {
          socket.emit("setTeamPosition", team, "left");
        }}
      />
      <Image
        image={pencilRight}
        width={150}
        height={100}
        offsetY={-300}
        offsetX={-1050}
        onMouseEnter={(e) => {
          console.log("cursor enter");
          document.body.style.cursor = "pointer";
        }}
        onMouseLeave={(e) => {
          console.log("cursor enter");
          document.body.style.cursor = "default";
        }}
        onClick={() => {
          socket.emit("setTeamPosition", team, "right");
        }}
      />
    </>
  );
};
