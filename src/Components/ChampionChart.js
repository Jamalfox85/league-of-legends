import React from "react";
import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
} from "chart.js";
import { Radar } from "react-chartjs-2";

ChartJS.register(
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend
);

const ChampionChart = ({ statData }) => {
  const data = {
    labels: ["Attack", "Defense", "Magic", "Difficulty"],
    datasets: [
      {
        label: "Champion Stats",
        data: statData,
        backgroundColor: "rgba(255, 99, 132, 0.2)",
        borderColor: "rgba(255, 99, 132, 1)",
        borderWidth: 1,
      },
    ],
  };

  return (
    <div>
      <Radar
        data={data}
        width={500}
        height={500}
        options={{ maintainAspectRatio: false }}
      />
    </div>
  );
};

export default ChampionChart;
