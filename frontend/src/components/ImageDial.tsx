import React from "react";
import { Image } from "react-konva";
import useImage from "use-image";
import { connect, useDispatch } from "react-redux";
import {
  rotateAroundCenter,
  findAngle,
  topCap,
  bottomCap,
  cap,
} from "../rotation";
import { throttle } from "lodash";
import { start, center } from "../consts";
import { IState } from "../store/store";

interface IImageDialProps {
  socket?: SocketIOClient.Socket;
  unlocked?: boolean;
  angle?: number;
}

export const ImageDial = ({ socket, unlocked, angle }: IImageDialProps) => {
  const [img] = useImage(require("../img/red-dial.png"));
  const [isMouseDown, setIsMouseDown] = React.useState(false);
  const [newAngle, setNewAngle] = React.useState(angle || 0);
  const imageRef = React.useRef(null);

  const delayedUpdateAngle = React.useRef(
    throttle((a: number) => {
      socket.emit("updateAngle", a);
    }, 500)
  ).current;

  React.useEffect(() => {
    if (angle && !isNaN(angle)) {
      console.log("angle prop changed to", angle);
      setNewAngle(angle);
    }
  }, [angle]);

  React.useEffect(() => {
    rotateAroundCenter(imageRef.current, newAngle);
    delayedUpdateAngle(newAngle);
  }, [newAngle]);

  return (
    <Image
      image={img}
      ref={imageRef}
      listening={unlocked}
      onMouseMove={(e) => {
        if (isMouseDown) {
          const currentPos = {
            x: bottomCap(e.evt.offsetX, 280),
            y: topCap(e.evt.offsetY, 500),
          };
          setNewAngle(cap(findAngle(start, center, currentPos) - 80, 81, -80));
        }
      }}
      onMouseDown={(e) => {
        if (unlocked) {
          setIsMouseDown(true);
        }
      }}
      onMouseUp={() => {
        console.log("mouse up");
        setIsMouseDown(false);
      }}
    />
  );
};

const mapStateToProps = (state: IState) => ({
  socket: state.socket,
});

// const mapDispatchToProps = (dispatch: Dispatch) => {
//   return {};
// };

// export const ImageDial = connect(mapStateToProps)(ImageDialUnconnected);
