import React from "react";
import { Image, Text, Layer } from "react-konva";
import useImage from "use-image";

interface IImageCardProps {
  left: string;
  right: string;
}
export const ImageCard = ({ left, right }: IImageCardProps) => {
  const [img] = useImage(require("../img/card.png"));
  return (
    <Layer>
      <Image
        image={img}
        listening={false}
        x={350}
        y={600}
        width={500}
        height={240}
      />
      <Text
        text={left}
        x={355}
        y={650}
        width={240}
        height={180}
        align="center"
        verticalAlign="middle"
        fontSize={24}
      />

      <Text
        text={right}
        x={600}
        y={650}
        width={240}
        height={180}
        align="center"
        verticalAlign="middle"
        fontSize={24}
      />
    </Layer>
  );
};
