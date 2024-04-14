import { useEffect, useState } from "react";
// import bb from "billboard.js";
import Chart from "chart.js/auto"; // Import Chart.js
import supabase from "../../connection";
import bb from "billboard.js/dist/billboard.pkgd.min.js"; // Import the billboard.js library
import "billboard.js/dist/billboard.css"; // Import the billboard.js CSS

// Import the 'donut' module from billboard.js
import "billboard.js/dist/billboard.pkgd.min.js"; // Import the billboard.js library
import "billboard.js/dist/billboard.css"; // Import the billboard.js CSS
import "billboard.js/dist/billboard.pkgd.min.js"; // Import the billboard.js library
import "billboard.js/dist/billboard.css"; // Import the billboard.js CSS

function DonutChart(props) {
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data, error } = await supabase
          .from("batsmen")
          .select("t20_runs, test_runs, odi_runs")
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
            ["T20 Runs", chartData[0].t20_runs], // Assuming chartData[0] has the data for the first player
            ["Test Runs", chartData[0].test_runs],
            ["ODI Runs", chartData[0].odi_runs],
          ],
          type: "donut",
          colors: {
            "T20 Runs": "#ff6384", // Custom color for T20 Runs
            "Test Runs": "#36a2eb", // Custom color for Test Runs
            "ODI Runs": "#ffce56", // Custom color for ODI Runs
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
        bindto: "#donut-chart",
      });

      return () => {
        chart.destroy();
      };
    }
  }, [chartData]);

  return (
    <div>
      <div id="donut-chart" />
    </div>
  );
}

export default DonutChart;

// import { useEffect, useState } from "react";
// import Chart from "chart.js/auto"; // Import Chart.js
// import bb from "billboard.js/dist/billboard.pkgd.min.js"; // Import the billboard.js library
// import "billboard.js/dist/billboard.css"; // Import the billboard.js CSS
// import supabase from "../../connection";

// function DonutChart(props) {
//   const [chartData, setChartData] = useState([]);
//   const [chartInstance, setChartInstance] = useState(null);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const { data, error } = await supabase
//           .from("batsmen")
//           .select("t20_runs, test_runs, odi_runs")
//           .eq("player_id", props.id);

//         if (error) {
//           throw error;
//         }

//         setChartData(data);
//       } catch (error) {
//         console.error("Error fetching data:", error.message);
//       }
//     };

//     fetchData();
//   }, []);

//   useEffect(() => {
//     if (chartData.length > 0) {
//       const ctx = document.getElementById("pie-chart");

//       // Destroy previous chart instance if it exists
//       if (chartInstance && chartInstance.destroy) {
//         chartInstance.destroy(); // Destroy the existing Chart instance
//       }

//       const newChartInstance = new Chart(ctx, {
//         type: "pie",
//         data: {
//           labels: ["T20 Runs", "Test Runs", "ODI Runs"],
//           datasets: [
//             {
//               label: "Runs",
//               data: [
//                 chartData[0]?.t20_runs || 0,
//                 chartData[0]?.test_runs || 0,
//                 chartData[0]?.odi_runs || 0,
//               ],
//               backgroundColor: ["#ff6384", "#36a2eb", "#ffce56"],
//             },
//           ],
//         },
//       });

//       // Save the new chart instance
//       setChartInstance(newChartInstance);
//     }
//   }, [chartData]);

//   // useEffect(() => {
//   //   if (chartData.length > 0) {
//   //     const chart = bb.generate({
//   //       data: {
//   //         columns: [
//   //           ["T20 Runs", chartData[0].t20_runs], // Assuming chartData[0] has the data for the first player
//   //           ["Test Runs", chartData[0].test_runs],
//   //           ["ODI Runs", chartData[0].odi_runs],
//   //         ],
//   //         type: "donut",
//   //         colors: {
//   //           "T20 Runs": "#ff6384", // Custom color for T20 Runs
//   //           "Test Runs": "#36a2eb", // Custom color for Test Runs
//   //           "ODI Runs": "#ffce56", // Custom color for ODI Runs
//   //         },
//   //         onclick: (d, i) => {
//   //           console.log("onclick", d, i);
//   //         },
//   //         onover: (d, i) => {
//   //           console.log("onover", d, i);
//   //         },
//   //         onout: (d, i) => {
//   //           console.log("onout", d, i);
//   //         },
//   //       },
//   //       donut: {
//   //         title: "Runs",
//   //       },
//   //       bindto: "#donut-chart",
//   //     });

//   //     return () => {
//   //       chart.destroy();
//   //     };
//   //   }
//   // }, [chartData]);

//   return (
//     <div>
//       <div id="donut-chart" />
//       {/* <canvas id="pie-chart" /> */}
//     </div>
//   );
// }

// export default DonutChart;
