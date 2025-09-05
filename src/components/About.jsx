const About = () => {
  return (
    <div
      style={{
        padding: "40px",
        maxWidth: "800px",
        margin: "auto",
        lineHeight: "1.6",
      }}
    >
      <h2 style={{ color: "#007bff", marginBottom: "20px" }}>
        About This Project
      </h2>
      <p>
        The <strong>Crypto Currency Dashboard</strong> is a simple and
        interactive web application designed to help users explore real-time
        data of various cryptocurrencies. It fetches live market data from the{" "}
        <a
          href="https://www.coingecko.com/en/api"
          target="_blank"
          rel="noopener noreferrer"
        >
          CoinGecko API
        </a>
        , providing insights into price, market cap, and 24-hour changes.
      </p>
      <p>
        🔍 You can search for specific coins by name or symbol, adjust the
        number of items displayed, and sort the results based on price, market
        cap, or alphabetical order.
      </p>
      <p>
        💡 This project is built using <strong>React</strong> and styled with
        custom CSS for a clean and responsive layout. It demonstrates the use of
        hooks like <code>useState</code> and <code>useEffect</code> for managing
        state and fetching data asynchronously.
      </p>
      <p>
        Whether you're a crypto enthusiast or just curious about the market,
        this dashboard offers a quick and intuitive way to stay informed.
      </p>
    </div>
  );
};

export default About;
