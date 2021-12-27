import React from "react";
import styles from "./Navbar.module.css";

const Navbar = () => {
  return (
    <div className={styles.wrapper}>
      <h1>LOL Stats</h1>
      <div className={styles.searchbar}>
        <form>
          <input type="text" />
          <button type="submit">Search</button>
        </form>
      </div>
    </div>
  );
};

export default Navbar;
