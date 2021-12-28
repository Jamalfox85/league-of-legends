import React, { useState, useEffect } from "react";
import Filter from "./Filter";
import styles from "./Main.module.css";
import Modal from "react-modal";
import ChampionChart from "./ChampionChart";

const Main = () => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [allChampions, setAllChampions] = useState(true);
  const [filter, setFilter] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [modalData, setModalData] = useState({});
  const tags = ["Assassin", "Fighter", "Mage", "Marksman", "Support", "Tank"];

  const displayAll = () => {
    setAllChampions(true);
  };
  const displayFilter = (id) => {
    setAllChampions(false);
    setFilter(tags[id]);
  };

  function toggleModal(modalId) {
    setIsOpen(!isOpen);
    console.log(modalData);
  }

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
  console.log(data);
  return (
    <div className={styles.wrapper}>
      <h1>test</h1>
      <Filter displayAll={displayAll} displayFilter={displayFilter} />
      <div className={styles.championgrid}>
        {championList.map(([key, value, index]) => (
          <div className={styles.championcard} key={key}>
            {value.name}
            {value.title}
            {value.tags}
            {/* <button onClick={() => toggleModal(key)}> */}
            <button
              onClick={() => {
                toggleModal();
                setModalData({
                  name: value.name,
                  title: value.title,
                  tags: value.tags,
                  blurb: value.blurb,
                  stats: [
                    value.info.attack,
                    value.info.defense,
                    value.info.magic,
                    value.info.difficulty,
                  ],
                  // info: value.stats,
                  info: Object.entries(value.stats),
                });
              }}
            >
              Display Adv Details
            </button>
            {/* {showDetails ? <AdvancedDetails/> : <h1>Test</h1>} */}
          </div>
        ))}
        <Modal isOpen={isOpen} onRequestClose={toggleModal} ariaHideApp={false}>
          <div>{modalData.name}</div>
          <div>{modalData.title}</div>
          <div>{modalData.tags}</div>
          <hr />
          <div>{modalData.blurb}</div>
          <ChampionChart statData={modalData.stats} />
          {/* {modalData.info.map(([key,item])=>(<div>{key}{item}</div>))} */}
          <button onClick={toggleModal}>Close modal</button>
        </Modal>
      </div>
    </div>
  );
};

export default Main;
