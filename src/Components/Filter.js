import React from "react";
import styles from "./Filter.module.css";

const Filter = ({ displayAll, displayFilter }) => {
  return (
    <div className={styles.filterwrapper}>
      <h1 className={styles.filterheader}>Champion Class</h1>
      <button onClick={displayAll}>All</button>
      <button onClick={() => displayFilter(0)}>Assassins</button>
      <button onClick={() => displayFilter(1)}>Fighters</button>
      <button onClick={() => displayFilter(2)}>Mages</button>
      <button onClick={() => displayFilter(3)}>Marksmen</button>
      <button onClick={() => displayFilter(4)}>Supports</button>
      <button onClick={() => displayFilter(5)}>Tanks</button>
    </div>
  );
};

export default Filter;
