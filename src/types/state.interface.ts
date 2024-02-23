import { GameInterface } from "./game.interface";


export interface AppContextType {
    games: GameInterface[],
    fetchData: () => void,
    fetchJackpot: () => void,
    loading: boolean
}
