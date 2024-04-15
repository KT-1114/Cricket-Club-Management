// import { useEffect, useState } from "react";
// import supabase from "../../connection";
// import bb from "billboard.js/dist/billboard.pkgd.min.js";
// import "billboard.js/dist/billboard.css";

// import "billboard.js/dist/billboard.pkgd.min.js";
// import "billboard.js/dist/billboard.css";
// import "billboard.js/dist/billboard.pkgd.min.js";
// import "billboard.js/dist/billboard.css";

// function ClubDonutChart(props) {
//   const [chartData, setChartData] = useState([]);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const { data, error } = await supabase
//           .from("clubs")
//           .select("won, total_matches, win_stats")
//           .eq("club_id", 1);

//         if (error) {
//           throw error;
//         }

//         setChartData(data);
//         console.log(data);
//       } catch (error) {
//         console.error("Error fetching data:", error.message);
//       }
//     };

//     fetchData();
//     console.log(chartData);
//   }, []);

//   useEffect(() => {
//     if (chartData.length > 0) {
//       const chart = bb.generate({
//         data: {
//           columns: [
//             ["Won", chartData[0].won],
//             ["Lost", chartData[0].total_matches - chartData[0].won],
//           ],
//           type: "donut",
//           colors: {
//             Won: "#ff6384",
//             Lost: "#36a2eb",
//           },
//           onclick: (d, i) => {
//             console.log("onclick", d, i);
//           },
//           onover: (d, i) => {
//             console.log("onover", d, i);
//           },
//           onout: (d, i) => {
//             console.log("onout", d, i);
//           },
//         },
//         donut: {
//           title: "Won",
//         },
//         bindto: "#donut-chart",
//       });

//       const chart2 = bb.generate({
//         data: {
//           columns: [
//             ["Won", chartData[0].won],
//             ["Lost", chartData[0].total_matches - chartData[0].won],
//           ],
//           type: "donut",
//           colors: {
//             Won: "#ff6384",
//             Lost: "#36a2eb",
//           },
//           onclick: (d, i) => {
//             console.log("onclick", d, i);
//           },
//           onover: (d, i) => {
//             console.log("onover", d, i);
//           },
//           onout: (d, i) => {
//             console.log("onout", d, i);
//           },
//         },

//         donut: {
//           title: "Lost",
//         },
//         bindto: "#donut-chart2",
//       });

//       return () => {
//         chart.destroy();
//       };
//     }
//   }, [chartData]);

//   return (
//     <div className="row d-flex p-5 justify-content-center">
//       <div className="col-xl-6 col-md-12">
//         <div className="" id="donut-chart" />
//       </div>
//       <div className="col-xl-6 col-md-12">
//         <div className="" id="donut-chart2" />
//       </div>
//     </div>
//   );
// }

// export default ClubDonutChart;

import { useEffect, useState } from "react";
import supabase from "../../connection";
import bb from "billboard.js/dist/billboard.pkgd.min.js";
import "billboard.js/dist/billboard.css";

function ClubDonutChart(props) {
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data, error } = await supabase
          .from("clubs")
          .select("won, total_matches, win_stats")
          .eq("club_id", 1);

        if (error) {
          throw error;
        }

        setChartData(data);
      } catch (error) {
        console.error("Error fetching data:", error.message);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (chartData.length > 0) {
      const winStats = chartData[0].win_stats;
      const years = Object.keys(winStats);
      const trophyCounts = Object.values(winStats);
      const donutChart = bb.generate({
        data: {
          columns: [
            ["Won", chartData[0].won],
            ["Lost", chartData[0].total_matches - chartData[0].won],
          ],
          type: "donut",
          colors: {
            Won: "#ff6384",
            Lost: "#36a2eb",
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
          title: "Won",
        },
        bindto: "#donut-chart",
      });

      const lineChart = bb.generate({
        data: {
          x: "Year",
          columns: [
            ["Year", ...years],
            ["Trophies Won", ...trophyCounts],
          ],
          type: "line",
        },
        axis: {
          x: {
            type: "category", // This ensures the x-axis treats years as categories
          },
        },
        bindto: "#line-chart",
      });

      return () => {
        donutChart.destroy();
        lineChart.destroy();
      };
    }
  }, [chartData]);

  return (
    <div className="row d-flex p-5 justify-content-center">
      <div className="col-xl-6 col-md-12">
        <div className="" id="donut-chart" />
      </div>
      <div className="col-xl-6 col-md-12">
        <div className="" id="line-chart" />
      </div>
    </div>
  );
}

export default ClubDonutChart;
