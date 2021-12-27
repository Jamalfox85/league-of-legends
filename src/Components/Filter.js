import React from "react";

const Filter = ({ displayAll, displayFilter }) => {
  return (
    <div>
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
