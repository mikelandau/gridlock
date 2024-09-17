import Car from './car';
import Coordinates from './coordinates';
import DragBoundaries from './dragBoundaries';

interface GameState {
    cars: Car[],
    holdingCar: boolean,
    heldCarIndex: number,
    heldCarPosition: Coordinates,
    holdOriginalCanvasMouse: Coordinates,
    dragBoundaries: DragBoundaries,
    currentLevel: number,
    levelComplete: boolean,
}

export default GameState;
