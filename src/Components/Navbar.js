import React from "react";
import styles from "./Navbar.module.css";

const Navbar = () => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.contentwrapper}>
        <h1 className={styles.logo}>LoL Champions</h1>
        <form className={styles.searchbar}>
          <input type="text" />
          <button type="submit">Search</button>
        </form>
      </div>
    </div>
  );
};

export default Navbar;
