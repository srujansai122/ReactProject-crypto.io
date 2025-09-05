import About from "./components/About";
import Home from "./components/Home";
import { Link, Routes, Route } from "react-router-dom";
import PageNotFound from "./PageNotFound";
import CoinDetails from "./components/CoinDetails";
function App() {
  return (
    <>
      <div className="header">
        <h1>Crypto Currency DashBoard</h1>
        <div className="Links">
          <Link to="/">Home</Link>
          <Link to="/about">About</Link>
        </div>
      </div>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/about" element={<About />}></Route>
        <Route path="/coins/:id" element={<CoinDetails></CoinDetails>}></Route>
        <Route path="*" element={<PageNotFound></PageNotFound>}></Route>
      </Routes>
    </>
  );
}

export default App;
