import React from "react";

import styles from "./backbutton.module.css";

type ButtonType = {
  back: () => void;
};
const BackButton = ({ back }: ButtonType) => {
  return (
    <button className={styles.back} type="button" onClick={back}>
      Back
    </button>
  );
};
export default BackButton;
