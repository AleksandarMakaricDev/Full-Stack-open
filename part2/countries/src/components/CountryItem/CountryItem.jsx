import React, { useState } from "react";
import styles from "./CountryItem.module.css";
import Country from "../Country/Country";

const CountryItem = ({ country, onSuccess, onError }) => {
  const [isDetailsView, setIsDetailsView] = useState();

  const showDetailsHandler = () => {
    setIsDetailsView((prev) => !prev);
  };

  return (
    <li className={styles.CountryItem}>
      <div>
        <span
          className={isDetailsView ? styles["CountryItem__name--active"] : ""}
        >
          {country.name}
        </span>
        <button onClick={showDetailsHandler}>
          {isDetailsView ? "Hide Details" : "Show Details"}
        </button>
      </div>
      {isDetailsView && (
        <Country country={country} onSuccess={onSuccess} onError={onError} />
      )}
    </li>
  );
};

export default CountryItem;
