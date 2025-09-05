import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend
);

const CoinDetails = () => {
  const { id } = useParams();
  const [coinData, setCoinData] = useState(null);
  const [chartData, setChartData] = useState(null);
  const [error, setError] = useState(null);

  const coinUrl = `https://api.coingecko.com/api/v3/coins/${id}`;
  const chartUrl = `https://api.coingecko.com/api/v3/coins/${id}/market_chart?vs_currency=inr&days=7`;

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const [coinRes, chartRes] = await Promise.all([
          fetch(coinUrl),
          fetch(chartUrl),
        ]);

        if (!coinRes.ok || !chartRes.ok)
          throw new Error("Failed to fetch coin data");

        const coinJson = await coinRes.json();
        const chartJson = await chartRes.json();

        setCoinData(coinJson);

        const prices = chartJson.prices.map((item) => ({
          time: new Date(item[0]).toLocaleDateString(),
          price: item[1],
        }));

        setChartData({
          labels: prices.map((p) => p.time),
          datasets: [
            {
              label: `${coinJson.name} Price (INR)`,
              data: prices.map((p) => p.price),
              fill: false,
              borderColor: "#007bff",
              tension: 0.3,
            },
          ],
        });
      } catch (err) {
        setError(err.message);
      }
    };

    fetchDetails();
  }, [id]);

  if (error) return <h2>{error}</h2>;
  if (!coinData || !chartData) return <h2>Loading...</h2>;

  return (
    <div style={{ padding: "40px", maxWidth: "800px", margin: "auto" }}>
      <h2 style={{ color: "#007bff" }}>{coinData.name} Details</h2>
      <img src={coinData.image.large} alt={coinData.name} width="80" />
      <p>
        <strong>Symbol:</strong> {coinData.symbol.toUpperCase()}
      </p>
      <p>
        <strong>Current Price:</strong> ₹
        {coinData.market_data.current_price.inr}
      </p>
      <p>
        <strong>Market Cap:</strong> ₹{coinData.market_data.market_cap.inr}
      </p>
      <p>
        <strong>24h Change:</strong>{" "}
        {coinData.market_data.price_change_percentage_24h}%
      </p>

      <div style={{ marginTop: "40px" }}>
        <Line data={chartData} />
      </div>
    </div>
  );
};

export default CoinDetails;
