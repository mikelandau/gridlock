import GameState from '@interfaces/gameState';
import InputState from '@interfaces/inputState';

import updateGrabState from './updateGrabState';
import updateHeldCarPosition from './updateHeldCarPosition';
import updateLevelCompleteStatus from './updateLevelCompleteStatus';

function update(ctx: CanvasRenderingContext2D, game: GameState, input: InputState) {
    updateGrabState(ctx, game, input);
    updateHeldCarPosition(ctx, game, input);
    updateLevelCompleteStatus(ctx, game);
}

export default update;
