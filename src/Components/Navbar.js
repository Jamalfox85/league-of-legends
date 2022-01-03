import React, { useRef } from "react";
import styles from "./Navbar.module.css";

const Navbar = ({ pullSearchData }) => {
  const searchInput = useRef(null);

  const handleSearchChange = () => {
    pullSearchData(searchInput.current.value);
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.contentwrapper}>
        <h1 className={styles.logo}>LoL Champions</h1>
        <form className={styles.searchbar}>
          <input ref={searchInput} type="text" onChange={handleSearchChange} />
          <button type="submit">Search</button>
        </form>
      </div>
    </div>
  );
};

export default Navbar;
