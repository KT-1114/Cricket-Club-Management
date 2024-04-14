import { useEffect, useState } from "react";
import supabase from "../../connection";
import bb from "billboard.js/dist/billboard.pkgd.min.js";
import "billboard.js/dist/billboard.css";

import "billboard.js/dist/billboard.pkgd.min.js";
import "billboard.js/dist/billboard.css";
import "billboard.js/dist/billboard.pkgd.min.js";
import "billboard.js/dist/billboard.css";

function AllRounderWicktesChart(props) {
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data, error } = await supabase
          .from("all_rounders")
          .select(
            "t20_wickets, test_wickets, odi_wickets, t20_runs, test_runs, odi_runs"
          )
          .eq("player_id", props.id);

        if (error) {
          throw error;
        }

        setChartData(data);
      } catch (error) {
        console.error("Error fetching data:", error.message);
      }
    };

    fetchData();
    console.log(chartData);
  }, []);

  useEffect(() => {
    if (chartData.length > 0) {
      const chart = bb.generate({
        data: {
          columns: [
            ["T20 Wickets", chartData[0].t20_wickets],
            ["Test Wickets", chartData[0].test_wickets],
            ["ODI Wickets", chartData[0].odi_wickets],
          ],
          type: "donut",
          colors: {
            "T20 Wickets": "#ff6384",
            "Test Wickets": "#36a2eb",
            "ODI Wickets": "#ffce56",
          },
          onclick: (d, i) => {
            console.log("onclick", d, i);
          },
          onover: (d, i) => {
            console.log("onover", d, i);
          },
          onout: (d, i) => {
            console.log("onout", d, i);
          },
        },
        donut: {
          title: "Wickets",
        },
        bindto: "#donut-chart",
      });

      const chart2 = bb.generate({
        data: {
          columns: [
            ["T20 Runs", chartData[0].t20_runs],
            ["Test Runs", chartData[0].test_runs],
            ["ODI Runs", chartData[0].odi_runs],
          ],
          type: "donut",
          colors: {
            "T20 Runs": "#ff6384",
            "Test Runs": "#36a2eb",
            "ODI Runs": "#ffce56",
          },
          onclick: (d, i) => {
            console.log("onclick", d, i);
          },
          onover: (d, i) => {
            console.log("onover", d, i);
          },
          onout: (d, i) => {
            console.log("onout", d, i);
          },
        },

        donut: {
          title: "Runs",
        },
        bindto: "#donut-chart2",
      });

      return () => {
        chart.destroy();
      };
    }
  }, [chartData]);

  return (
    <div className="row d-flex justify-content-center">
      <div className="col-xl-6 col-md-12">
        <div className="" id="donut-chart" />
      </div>
      <div className="col-xl-6 col-md-12">
        <div className="" id="donut-chart2" />
      </div>
    </div>
  );
}

export default AllRounderWicktesChart;
