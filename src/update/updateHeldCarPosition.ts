import GameState from '@interfaces/gameState';
import InputState from '@interfaces/inputState';

import getHeldCarPosition from '@util/getHeldCarPosition';

function updateHeldCarPosition(ctx: CanvasRenderingContext2D, game: GameState, input: InputState) {
    if (game.holdingCar && game.heldCarIndex >= 0) {
        game.heldCarPosition = getHeldCarPosition(ctx, game, input)
    }
}

export default updateHeldCarPosition;
