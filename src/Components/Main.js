import React, { useState, useEffect } from "react";
import Filter from "./Filter";
import styles from "./Main.module.css";
import modalstyles from "./ModalStyles.module.css";
import Modal from "react-modal";
import ChampionChart from "./ChampionChart";

const Main = ({ searchData }) => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [allChampions, setAllChampions] = useState(true);
  const [filter, setFilter] = useState(null);
  const [useFilter, setUseFilter] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [modalData, setModalData] = useState({});
  const tags = ["Assassin", "Fighter", "Mage", "Marksman", "Support", "Tank"];

  const displayAll = () => {
    setAllChampions(true);
  };
  const displayFilter = (id) => {
    setAllChampions(false);
    setUseFilter(true);
    setFilter(tags[id]);
  };
  const displaySearch = (searchData) => {
    setAllChampions(false);
    setUseFilter(false);
  };

  function toggleModal(modalId) {
    setIsOpen(!isOpen);
    console.log(modalData);
  }

  useEffect(() => {
    if (searchData.length > 0) {
      displaySearch();
    }
    console.log(searchData);
  }, [searchData]);

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
    } else if (!allChampions && useFilter) {
      return champion[1].tags.includes(filter);
    } else if (!allChampions && !useFilter) {
      return champion[1].name.toLowerCase().includes(searchData.toLowerCase());
    } else {
      return null;
    }
  });
  console.log(data);

  return (
    <div className={styles.wrapper}>
      <Filter displayAll={displayAll} displayFilter={displayFilter} />
      <div className={styles.championgrid}>
        {championList.map(([key, value, index]) => (
          <div className={styles.championcard} key={key}>
            <div className={styles.cardname}>{value.name}</div>
            <div className={styles.cardtitle}>{value.title}</div>
            <div className={styles.cardtags}>
              <div className={styles.cardtag}>{value.tags[0]}</div>
              <div className={styles.cardtag}>{value.tags[1]}</div>
            </div>
            <div className={styles.image}>
              <img
                alt="Champion Portrait Not Available"
                src={`http://ddragon.leagueoflegends.com/cdn/5.9.1/img/champion/${value.image.full}`}
              />
            </div>
            {/* <button onClick={() => toggleModal(key)}> */}
            <button
              className={styles.advdetailsbttn}
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
        <Modal
          // className={modalstyles.wrapper}
          isOpen={isOpen}
          onRequestClose={toggleModal}
          ariaHideApp={false}
        >
          <div className={modalstyles.wrapper}>
            <div className={modalstyles.modalheader}>
              <div className={modalstyles.modalname}>{modalData.name}</div>
              <div className={modalstyles.modaltitle}>{modalData.title}</div>
              <div className={modalstyles.modaltags}>{modalData.tags}</div>
            </div>
            <hr />
            <div className={modalstyles.modalbody}>
              <div className={modalstyles.modalblurb}>{modalData.blurb}</div>
              <ChampionChart statData={modalData.stats} />
            </div>
            {/* {modalData.info.map(([key,item])=>(<div>{key}{item}</div>))} */}
            <button onClick={toggleModal}>Close modal</button>
          </div>
        </Modal>
      </div>
    </div>
  );
};

export default Main;
