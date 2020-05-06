import React from "react";
import { Image } from "react-konva";
import useImage from "use-image";

export const ImageWavelength = () => {
  const [img] = useImage(require("../img/wavelength-board.png"));
  return <Image image={img} listening={false} />;
};

export const ImageHalfFrame = () => {
  const [img] = useImage(require("../img/wavelength-half-frame.png"));
  return <Image image={img} listening={false} />;
};

export const Background = () => {
  const [img] = useImage(require("../img/space-background.png"));
  return <Image image={img} listening={false} />;
};
