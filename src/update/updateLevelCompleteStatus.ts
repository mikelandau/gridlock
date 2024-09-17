import GameState from '@interfaces/gameState';

import isLevelCompleted from '@util/isLevelCompleted';

function updateLevelCompleteStatus(ctx: CanvasRenderingContext2D, game: GameState) {
    if (game.heldCarIndex === 0 && isLevelCompleted(ctx, game.cars[game.heldCarIndex], game.heldCarPosition)) {
        if (game.currentLevel === 3) {
            alert('You\'re purdy smart there einstein');
        }
        game.currentLevel = Math.min(3, game.currentLevel + 1);
        game.levelComplete = true;
        return;
    }
}

export default updateLevelCompleteStatus;
