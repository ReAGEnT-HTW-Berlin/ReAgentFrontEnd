import React, { useEffect, useState } from "react";
import { Bar, Line, Pie, Doughnut } from "react-chartjs-2";
import { Card } from "@material-ui/core";
const options = {
  title: {
    display: true,
    text: "Total Tweets per Year",
  },
  legend: {
    display: false,
  },
};
var parties = {
  AfD: { 0: "AfD" },
  B90: { 1: "B90" },
  CDU: { 2: "CDU" },
  CSU: { 3: "CSU" },
  FDP: { 4: "FDP" },
  Linke: { 5: "Linke" },
  Parteilos: { 6: "Parteilos" },
  SPD: { 7: "SPD" },
};
function CountTotalByMonth_induvidual({ party }) {
  const [d, setD] = useState(0);
  const [color, setColor] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      await fetch("http://reagent1.f4.htw-berlin.de:8080/countTweetByMonth")
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          setD(data[Object.values(party)[0]][Object.values(party)[1]]);
          setColor(Object.values(party)[2] + Object.values(party)[3]);
        });
    };
    fetchData();
  }, [party]);
  return (
    <div className="charts">
      {
        <Card>
          <Bar
            data={{
              labels: [2017, 2018, 2019, 2020, 2021],
              datasets: [
                {
                  data: [d[2017], d[2018], d[2019], d[2020], d[2021]],
                  backgroundColor: color,
                  borderColor: color,
                },
              ],
            }}
            options={options}
          />
        </Card>
      }
    </div>
  );
}

export default CountTotalByMonth_induvidual;
