import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
const Home = () => {
  const [data, setData] = useState([]);
  const [search, setSearch] = useState("");
  const [selectChange, setSelectChange] = useState("10");
  const [sortChange, setSortChange] = useState("current_price");
  const apiUrl = `https://api.coingecko.com/api/v3/coins/markets?vs_currency=inr`;
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const formatINR = (amount) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 2,
    }).format(amount);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `${apiUrl}&order=market_cap_desc&per_page=${selectChange}&page=1&sparkline=false`
        );
        if (!response.ok)
          throw new Error("Network response was not ok😔! Failed to Load Data");
        const jsonData = await response.json();
        setData(jsonData);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };
    fetchData();
  }, [selectChange]);

  const filteredData = data
    .filter(
      (item) =>
        item.name.toLowerCase().includes(search.toLowerCase()) ||
        item.symbol.toLowerCase().includes(search.toLowerCase())
    )
    .slice()
    .sort((a, b) => {
      switch (sortChange) {
        case "market_cap_desc":
          return b.market_cap - a.market_cap;
        case "market_cap_asc":
          return a.market_cap - b.market_cap;
        case "price_asc":
          return a.current_price - b.current_price;
        case "price_desc":
          return b.current_price - a.current_price;
        case "name":
          return a.name.localeCompare(b.name);
      }
    });

  if (loading) return <h2>Loading....</h2>;
  if (error) return <h2>{error}</h2>;
  return (
    <>
      <div className="container">
        <input
          type="text"
          placeholder="Search Crypto"
          onChange={(e) => setSearch(e.target.value)}
          value={search}
        />

        <label htmlFor="select_limit">Limit Items :</label>
        <select
          name="select_limit"
          className="limit"
          onChange={(e) => setSelectChange(e.target.value)}
          value={selectChange}
        >
          <option value="5">5</option>
          <option value="10">10</option>
          <option value="15">15</option>
          <option value="20">20</option>
        </select>

        <label htmlFor="sort">Sort By:</label>
        <select
          name="sort"
          value={sortChange}
          onChange={(e) => setSortChange(e.target.value)}
        >
          <option value="price_asc">Price asc</option>
          <option value="price_desc">Price desc</option>
          <option value="name">Name</option>
          <option value="market_cap_desc">Market_cap_desc</option>
          <option value="market_cap_asc">Market_cap_asc</option>
        </select>
      </div>
      <div className="grid">
        {filteredData.length == 0 ? (
          <p>No Items found</p>
        ) : (
          filteredData.map((item) => (
            <Link
              to={`/coins/${item.id}`}
              key={item.id}
              style={{ textDecoration: "none", color: "black" }}
            >
              <div className="grid_item" key={item.id}>
                <div className="grid_item1">
                  <img src={item.image} alt={item.name} />
                </div>
                <div className="grid_item2">
                  <h2>{item.name}</h2>
                  <p>Symbol : {item.symbol}</p>
                  <p>Current Price : {formatINR(Number(item.current_price))}</p>
                  <p>Market Cap : {formatINR(Number(item.market_cap))}</p>
                  <p
                    style={{
                      color:
                        item.price_change_percentage_24h > 0 ? "green" : "red",
                    }}
                  >
                    24h Change : {item.price_change_percentage_24h}%
                  </p>
                </div>
              </div>
            </Link>
          ))
        )}
      </div>
    </>
  );
};

export default Home;
