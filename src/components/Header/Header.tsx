import React from "react";
import styles from "./header.module.css";
const Header = () => {
  return (
    <h1 className={styles.header}>
      Weather <span className={styles.forecast}>Forecast</span>
    </h1>
  );
};

export default Header;
