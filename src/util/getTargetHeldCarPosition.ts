import Coordinates from '@interfaces/coordinates';
import GameState from '@interfaces/gameState';
import InputState from '@interfaces/inputState';

import getOriginForSpace from './getOriginForSpace';

function getTargetHeldCarPosition(ctx: CanvasRenderingContext2D, game: GameState, input: InputState): Coordinates {
    const heldCar = game.cars[game.heldCarIndex];
    const heldCarOrigin = getOriginForSpace(ctx, heldCar.x, heldCar.y);
    const dragX = input.canvasMouse.x - game.holdOriginalCanvasMouse.x;
    const dragY = input.canvasMouse.y - game.holdOriginalCanvasMouse.y;
    const targetHeldCarPositionX = heldCarOrigin.x + dragX;
    const targetHeldCarPositionY = heldCarOrigin.y + dragY;
    return { x: targetHeldCarPositionX, y: targetHeldCarPositionY };
}

export default getTargetHeldCarPosition;
