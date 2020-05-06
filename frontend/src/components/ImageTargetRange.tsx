import React from "react";
import { Image } from "react-konva";
import useImage from "use-image";
import { rotateAroundCenter } from "../rotation";

export const ImageTargetRange = ({ angle }: { angle?: number }) => {
  const [img] = useImage(require("../img/points-bar.png"));
  const imageRef = React.useRef(null);

  React.useEffect(() => {
    rotateAroundCenter(imageRef.current, angle);
  }, [angle, imageRef]);

  return <Image image={img} ref={imageRef} listening={false} />;
};
