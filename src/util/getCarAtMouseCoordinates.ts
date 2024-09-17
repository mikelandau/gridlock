import GameState from '@interfaces/gameState';
import InputState from '@interfaces/inputState';

import isCoordinateOverCar from './isCoordinateOverCar';

function getCarAtMouseCoordinates(ctx: CanvasRenderingContext2D, game: GameState, input: InputState): number {
    for (let i = 0; i < game.cars.length; ++i) {
        if (isCoordinateOverCar(ctx, game.cars[i], input.canvasMouse)) {
            return i;
        }
    }
    return -1;
}

export default getCarAtMouseCoordinates;
