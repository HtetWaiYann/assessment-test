import { createContext, useEffect, useState } from "react";
import { AppContextType } from "../types/state.interface";
import { GameInterface } from "../types/game.interface";
import { JackpotInterface } from "../types/jackpot.interface";

export const AppContext = createContext<AppContextType | null>(null);

export const AppProvider = ({ children }: { children: React.ReactNode }) => {
  const [games, setGames] = useState<GameInterface[]>([]);
  const [loading, setLoading] = useState(false);
  const fetchData = async () => {
    try {
      setLoading(true);
      const [gamesResponse, jackpotResponse] = await Promise.all([
        fetch("http://stage.whgstage.com/front-end-test/games.php"),
        fetch("http://stage.whgstage.com/front-end-test/jackpots.php"),
      ]);
      const gamesData: GameInterface[] = await gamesResponse.json();
      const jackpotsData: JackpotInterface[] = await jackpotResponse.json();
      const data = gamesData.map((game) => {
        const jackpot = jackpotsData.find(
          (jackpot: JackpotInterface) => jackpot.game === game.id
        );
        return {
          ...game,
          jackpot: jackpot?.amount || 0,
        };
      });
      setGames(data);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  const fetchJackpot = async () => {
    try {
      const jackpotResponse = await fetch("http://stage.whgstage.com/front-end-test/jackpots.php")
      const jackpotsData: JackpotInterface[] = await jackpotResponse.json();
      console.log(games);
      const data = games.map((game) => {
        const jackpot = jackpotsData.find(
          (jackpot: JackpotInterface) => jackpot.game === game.id
        );
        return {
          ...game,
          jackpot: jackpot?.amount || 0,
        };
      });
      setGames(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <AppContext.Provider value={{ games, fetchData, fetchJackpot, loading }}>
      {children}
    </AppContext.Provider>
  );
};
