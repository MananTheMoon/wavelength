import React from "react";
import { Image } from "react-konva";
import useImage from "use-image";
import { rotateAroundCenter } from "../rotation";

enum AnimDirection {
  left = -1,
  none = 0,
  right = 1,
}

const coveredAngle = 0;
const unCoveredAngle = -168;

export const ImageCover = ({
  covered,
  opacity = 1,
}: {
  covered: boolean;
  opacity?: number;
}) => {
  const [img] = useImage(require("../img/blue-cover.png"));
  const imageRef = React.useRef(null);

  // TODO (Manan)
  // const [animDirection, setAnimDirection] = React.useState<AnimDirection>(
  //   AnimDirection.none
  // );
  // const [animAngle, setAnimAngle] = React.useState(covered ? 0 : -168);

  // React.useEffect(() => {
  //   console.log("in the loop");
  //   async function sleep() {
  //     console.log("sleep start");
  //     await new Promise((resolve) => setTimeout(resolve, 2000));
  //     console.log("sleep done");
  //   }

  //   if (animDirection == AnimDirection.right && animAngle < 0) {
  //     setAnimAngle(animAngle + 1);
  //   } else if (animDirection == AnimDirection.left && animAngle > -168) {
  //     setAnimAngle(animAngle - 1);
  //   } else {
  //     setAnimDirection(AnimDirection.none);
  //   }
  // }, [animAngle, animDirection]);

  React.useEffect(() => {
    const rotation = covered ? 0 : -168;
    // setAnimAngle(covered ? 0 : -168);
    // setAnimDirection(covered ? AnimDirection.right : AnimDirection.left);
    console.log("here");
    rotateAroundCenter(imageRef.current, rotation);
  }, [imageRef, covered]);

  return <Image image={img} ref={imageRef} opacity={opacity} />;
};
