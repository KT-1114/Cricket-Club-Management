import { useEffect, useRef, useState } from "react";
import Chart from "chart.js/auto";
import supabase from "../../connection";

function LineGraph({ jsonData }) {
  const [chartData, setChartData] = useState(null);
  const chartRef = useRef(null);

  useEffect(() => {
    if (jsonData) {
      const labels = Object.keys(jsonData);
      const data = Object.values(jsonData);
      console.log(data)

      setChartData({
        labels: labels,
        datasets: [
          {
            label: "Data",
            data: data,
            borderColor: "#FF6384",
            fill: false,
          },
        ],
      });
    }
  }, [jsonData]);

  useEffect(() => {
    if (chartData) {
      const ctx = chartRef.current.getContext("2d");

      new Chart(ctx, {
        type: "line",
        data: chartData,
        options: {
          scales: {
            x: {
              type: "time",
              time: {
                unit: "month",
              },
            },
          },
        },
      });
    }
  }, [chartData]);

  return (
    <div>
      <h2>Line Graph</h2>
      <canvas ref={chartRef} width="400" height="400"></canvas>
    </div>
  );
}

function FetchAndRenderLineGraph() {
  const [clubData, setClubData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data, error } = await supabase
          .from("clubs")
          .select("win_stats").eq("club_id",1)
          ;

        if (error) {
          throw error;
        }

        if (data && data.length > 0) {
          setClubData(data[0].win_stats);
        } else {
          setError("No data available");
        }
      } catch (error) {
        console.error("Error fetching data:", error.message);
        setError(error.message);
      }
    };

    fetchData();
  }, []);

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      {clubData ? <LineGraph jsonData={clubData} /> : <div>Loading...</div>}
    </div>
  );
}

export default FetchAndRenderLineGraph;
