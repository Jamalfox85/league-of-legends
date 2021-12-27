import React, { useState, useEffect } from "react";
import AdvancedDetails from "./AdvancedDetails";
import Filter from "./Filter";
import styles from "./Main.module.css";

const Main = () => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [allChampions, setAllChampions] = useState(true);
  const [filter, setFilter] = useState(null);
  const [showDetails, setShowDetails] = useState(false);

  const tags = ["Assassin", "Fighter", "Mage", "Marksman", "Support", "Tank"];

  const displayAll = () => {
    setAllChampions(true);
  };
  const displayFilter = (id) => {
    setAllChampions(false);
    setFilter(tags[id]);
  };

  const handleShowDetails = () => {
    setShowDetails(true);
  };
  const handleHideShowDetails = () => {
    setShowDetails(false);
  };

  useEffect(() => {
    fetch(
      "http://ddragon.leagueoflegends.com/cdn/11.24.1/data/en_US/champion.json"
    )
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw response;
        }
      })
      .then((data) => {
        setData(data.data);
      })
      .catch((error) => {
        setError(error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  if (loading) return "Loading...";
  if (error) return "Error...";

  const championData = Object.entries(data);

  const championList = championData.filter((champion) => {
    if (allChampions) {
      return championData;
    } else {
      return champion[1].tags.includes(filter);
    }
  });

  return (
    <div className={styles.wrapper}>
      <h1>test</h1>
      <Filter displayAll={displayAll} displayFilter={displayFilter} />
      <div className={styles.championgrid}>
        {championList.map(([key, value]) => (
          <div className={styles.championcard} key={key}>
            {value.name}
            {value.title}
            {value.tags}
            <button onClick={handleShowDetails}>Display Adv Details</button>
            {showDetails ? <AdvancedDetails /> : null}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Main;
