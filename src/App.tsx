import { useContext, useEffect, useState } from "react";
import "./App.css";
import Navbar from "./pages/navbar/Navbar";
import Home from "./pages/home/Home";
import { AppContextType } from "./types/state.interface";
import { AppContext } from "./context/state";

function App() {
  const [active, setActive] = useState("new");
  const { games, loading, fetchJackpot } = useContext(
    AppContext
  ) as AppContextType;
  const filtered =
    active === "jackpots"
      ? games.filter((game) => game.jackpot > 0)
      : games.filter((game) =>
          game.categories.includes(
            active == "other" ? "ball" || "virtual" || "fun" : active
          )
        );
  const renderHomePage = loading ? (
    <div className="loading">Loading...</div>
  ) : <Home games={filtered}/>;

  useEffect(() => {
    const intervalId = setInterval(() => {
      fetchJackpot();
    }, 3000);

    // Clear the interval when the component unmounts
    return () => clearInterval(intervalId);
  }, [games]);

  return (
    <>
      <Navbar active={active} setActive={setActive} />

      
      {renderHomePage}
    </>
  );
}

export default App;
