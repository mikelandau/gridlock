import GameState from '@interfaces/gameState';
import InputState from '@interfaces/inputState';

import getCarAtMouseCoordinates from '@util/getCarAtMouseCoordinates';
import getDragBoundaries from '@util/getDragBoundaries';
import getHeldCarPosition from '@util/getHeldCarPosition';
import getNearestSpaceForCoordinates from '@util/getNearestSpaceForCoordinates';

function updateGrabState(ctx: CanvasRenderingContext2D, game: GameState, input: InputState) {
    if (!game.holdingCar && input.mouseButtonPressed) {
        game.holdingCar = true;
        game.heldCarIndex = getCarAtMouseCoordinates(ctx, game, input);
        game.holdOriginalCanvasMouse = { ...input.canvasMouse };
        if (game.heldCarIndex >= 0) {
            game.dragBoundaries = getDragBoundaries(ctx, game);
            game.playPickupSound = true;
        }
    }
    else if (game.holdingCar && !input.mouseButtonPressed) {
        if (game.heldCarIndex >= 0) {
            const heldCarPosition = getHeldCarPosition(ctx, game, input);
            const newSpaceCoords = getNearestSpaceForCoordinates(ctx, heldCarPosition);
            game.cars[game.heldCarIndex].x = newSpaceCoords.x;
            game.cars[game.heldCarIndex].y = newSpaceCoords.y;
            game.playDropSound = true;
        }
        game.holdingCar = false;
        game.heldCarIndex = -1;
    }
}

export default updateGrabState;