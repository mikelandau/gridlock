import GameState from '@interfaces/gameState';

import isLevelCompleted from '@util/isLevelCompleted';

function updateToTearDownPhaseIfLevelWon(ctx: CanvasRenderingContext2D, game: GameState) {
    if (game.heldCarIndex === 0 && isLevelCompleted(ctx, game.cars[game.heldCarIndex], game.heldCarPosition)) {
        if (game.currentLevel === 3) {
            alert('You\'re purdy smart there einstein');
        }
        game.gamePhase = 'tearingDownLevel';
        game.cars.forEach((car, i) => {
            car.animation = 'falling';
            car.animationFrame = i * -10;
        })
        return;
    }
}

export default updateToTearDownPhaseIfLevelWon;
