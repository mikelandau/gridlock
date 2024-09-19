import GameState from '@interfaces/gameState';

import primaryCarColor from './primaryCarColor';
import carColors from './carColors';
import drawCar from './drawCar';

function drawHeldCar(ctx: CanvasRenderingContext2D, game: GameState): void {
    if (game.heldCarIndex >= 0) {
        const heldCar = game.cars[game.heldCarIndex];
        const color = game.heldCarIndex === 0 ? primaryCarColor : carColors[game.heldCarIndex];
        const carPosition = { ...game.heldCarPosition };
            if (heldCar.animation === 'falling') {
                carPosition.x += heldCar.animationFrame * 5;
            }
            drawCar(ctx, heldCar, color, carPosition, true);
    }
}

export default drawHeldCar;
