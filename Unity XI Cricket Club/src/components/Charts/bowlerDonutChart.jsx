import { useEffect, useState } from "react";
// import bb from "billboard.js";
import supabase from "../../connection";
import bb from 'billboard.js/dist/billboard.pkgd.min.js'; // Import the billboard.js library
import 'billboard.js/dist/billboard.css'; // Import the billboard.js CSS

// Import the 'donut' module from billboard.js
import 'billboard.js/dist/billboard.pkgd.min.js'; // Import the billboard.js library
import 'billboard.js/dist/billboard.css'; // Import the billboard.js CSS
import 'billboard.js/dist/billboard.pkgd.min.js'; // Import the billboard.js library
import 'billboard.js/dist/billboard.css'; // Import the billboard.js CSS



function BowlerDonutChart(props) {
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data, error } = await supabase.from("bowlers").select("t20_wickets, test_wickets, odi_wickets").eq("player_id", props.id) ;

        if (error) {
          throw error;
        }

        setChartData(data);
      } catch (error) {
        console.error("Error fetching data:", error.message);
      }
    };

    
    fetchData();
    console.log(chartData)
  }, []);

  useEffect(() => {
    if (chartData.length > 0) {
      const chart = bb.generate({
        data: {
          columns: [
            ["T20 Wickets", chartData[0].t20_wickets], // Assuming chartData[0] has the data for the first player
            ["Test Wickets", chartData[0].test_wickets],
            ["ODI Wickets", chartData[0].odi_wickets]
          ],
          type: "donut",
          colors: {
            "T20 Wickets": "#ff6384", // Custom color for T20 Wickets
            "Test Wickets": "#36a2eb", // Custom color for Test Wickets
            "ODI Wickets": "#ffce56" // Custom color for ODI Wickets
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
  
      return () => {
        chart.destroy();
      };
    }
  }, [chartData]);

  return <div id="donut-chart" />;
}

export default BowlerDonutChart;
