import React from "react";
import styles from "./index.module.css";

const ColouredHeaderText = ({
  text,
  fontSize,
}: {
  text: string;
  fontSize: string;
}) => {
  return (
    <div
      className={`${styles.header} ${
        fontSize ? fontSize : "text-lg regular sm:text-2xl"
      } biome-bold`}
    >
      {text}
    </div>
  );
};

export default ColouredHeaderText;
