import React from "react";
import styles from "./Search.module.css";

const Search = ({ onSearchChange, searchQuery }) => {
  return (
    <div className={styles.Search}>
      <label htmlFor="search">Search countries:</label>
      <input
        id="search"
        type="search"
        name="search"
        onChange={onSearchChange}
        value={searchQuery}
      />
    </div>
  );
};

export default Search;
