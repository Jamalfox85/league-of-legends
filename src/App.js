import Navbar from "./Components/Navbar";
import "./App.css";
import Main from "./Components/Main";
import React, { useState } from "react";

function App() {
  const [searchData, setSearchData] = useState("");
  const pullSearchData = (newSearchData) => {
    setSearchData(newSearchData);
  };

  return (
    <div className="App">
      <Navbar pullSearchData={pullSearchData} />
      <Main searchData={searchData} />
    </div>
  );
}

export default App;
