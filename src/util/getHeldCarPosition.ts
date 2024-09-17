import GameState from '@interfaces/gameState';
import InputState from '@interfaces/inputState';

import getTargetHeldCarPosition from './getTargetHeldCarPosition';

function getHeldCarPosition(ctx: CanvasRenderingContext2D, game: GameState, input: InputState) {
    
    const targetHeldCarPosition = getTargetHeldCarPosition(ctx, game, input);
    const heldCarPosition = {
        x: Math.max(game.dragBoundaries.minX, Math.min(game.dragBoundaries.maxX, targetHeldCarPosition.x)),
        y: Math.max(game.dragBoundaries.minY, Math.min(game.dragBoundaries.maxY, targetHeldCarPosition.y))
    }
    
    return heldCarPosition;
}
export default getHeldCarPosition;