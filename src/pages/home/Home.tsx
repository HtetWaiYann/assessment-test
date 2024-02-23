import { GameInterface } from "../../types/game.interface";
import "./Home.css";

const Home = (games: any) => {
  const filteredGames = games.games;
  return (
    <>
      <div className="container">
        {filteredGames.length === 0 ? (
          <div className="no-games">No games found</div>
        ) : (
          filteredGames.map((game: GameInterface) => {
            const isTop : boolean = game.categories.includes("top")
            const isNew : boolean = game.categories.includes("new")
            return (
              <div key={game.id} className="game-container">
                {game.jackpot > 0 && (
                  <div className="jackpot">€ {game.jackpot}</div>
                )}

                {
                  isTop && isNew ? 
                  <div className="ribbon-container">
                    <div className="new-top-ribbon">New & Top</div>
                  </div>
                  : isTop ?
                  <div className="ribbon-container">
                    <div className="new-ribbon">Top</div>
                  </div>
                  : isNew ?
                  <div className="ribbon-container">
                    <div className="new-ribbon">New</div>
                  </div> : null

                  


                }
                {/* {game.categories.includes("new") && (
                  <div className="new-ribbon">New</div>
                )}
                {game.categories.includes("top") && (
                  <div className="new-ribbon">Top</div>
                )} */}
                <img src={game.image} alt={game.name} />
                <div className="game-name-container">
                  <div className="game-name">{game.name.toUpperCase()}</div>
                  <div className="play-btn-container">
                    <button className="play-btn">Play</button>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
    </>
  );
};

export default Home;
