import GameState from '@interfaces/gameState';
import InputState from '@interfaces/inputState';

import areAllAnimationsFinished from '@util/areAllAnimationsFinished';

import updateGrabState from './updateGrabState';
import updateHeldCarPosition from './updateHeldCarPosition';
import updateToTearDownPhaseIfLevelWon from './updateToTearDownPhaseIfLevelWon';
import updateToPlayPhase from './updateToPlayPhase';
import animateCars from './animateCars';

function update(ctx: CanvasRenderingContext2D, game: GameState, input: InputState) {
    if (game.gamePhase === 'settingUpLevel') {
        animateCars(game);
        if (areAllAnimationsFinished(game)) {
            updateToPlayPhase(game);
        }
    } else if (game.gamePhase === 'play') {
        updateGrabState(ctx, game, input);
        updateHeldCarPosition(ctx, game, input);
        updateToTearDownPhaseIfLevelWon(ctx, game);
    } else if (game.gamePhase === 'tearingDownLevel') {
        animateCars(game);
        if (areAllAnimationsFinished(game)) {
            game.levelComplete = true;
            game.currentLevel = game.currentLevel + 1 % 3;
        }
    }
}

export default update;
