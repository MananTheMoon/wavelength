import React from "react";
import { Image } from "react-konva";
import useImage from "use-image";
import { rotateAroundCenter } from "../rotation";

export const ImageCover = ({
  covered,
  opacity = 1,
}: {
  covered: boolean;
  opacity?: number;
}) => {
  const [img] = useImage(require("../img/blue-cover.png"));
  const imageRef = React.useRef(null);

  React.useEffect(() => {
    const rotation = covered ? 0 : -168;
    console.log("here");
    rotateAroundCenter(imageRef.current, rotation);
  }, [imageRef, covered]);

  return <Image image={img} ref={imageRef} opacity={opacity} />;
};
