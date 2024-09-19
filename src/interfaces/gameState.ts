import Car from './car';
import Coordinates from './coordinates';
import DragBoundaries from './dragBoundaries';

type GamePhase = 'title' | 'settingUpLevel' | 'play' | 'tearingDownLevel';

interface GameState {
    cars: Car[],
    holdingCar: boolean,
    heldCarIndex: number,
    heldCarPosition: Coordinates,
    holdOriginalCanvasMouse: Coordinates,
    dragBoundaries: DragBoundaries,
    currentLevel: number,
    levelComplete: boolean,
    gamePhase: GamePhase,
    playPickupSound: boolean,
    playDropSound: boolean
}

export default GameState;
