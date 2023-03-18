import React, { useState } from "react";
import styles from "./form.module.css";
type FormButton = {
  search: (value: string) => void;
  searchGeo: () => void;
};
const Form = ({ search, searchGeo }: FormButton) => {
  const [value, setValue] = useState("");
  return (
    <div>
      <input
        className={styles.input}
        value={value}
        type="text"
        placeholder="Input city"
        onChange={(e) => setValue(e.target.value)}
      />
      <button
        className={styles.search}
        type="button"
        onClick={() => search(value)}
      >
        Search
      </button>
      <p className={styles.text}>OR</p>
      <button className={styles.search} type="button" onClick={searchGeo}>
        Search by geolocation
      </button>
    </div>
  );
};

export default Form;
