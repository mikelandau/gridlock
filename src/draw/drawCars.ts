import GameState from '@interfaces/gameState';

import getOriginForSpace from '@util/getOriginForSpace';

import drawCar from './drawCar';
import carColors from './carColors';
import primaryCarColor from './primaryCarColor';



function drawCars(ctx: CanvasRenderingContext2D, game: GameState): void {
    game.cars.forEach((car, i) => {
        const color = i === 0 ? primaryCarColor : carColors[i];
        if (i === game.heldCarIndex) {
            return;
        }
        else {
            const carPosition = getOriginForSpace(ctx, car.x, car.y);
            if (car.animation === 'incoming') {
                if (car.animationFrame < 0) return;
                const ratio = Math.max(0, (30 - car.animationFrame) / 30);
                carPosition.y -= (1/60) * Math.pow((ctx.canvas.height * ratio), 2);
            }
            else if (car.animation === 'falling') {
                if (car.animationFrame > 30) return;
                const ratio = Math.max(0, Math.min(1, car.animationFrame / 30));
                carPosition.y += (1/60) * Math.pow((ctx.canvas.height * ratio), 2);
            }
            drawCar(ctx, car, color, carPosition, false);
        }
    });
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

export default drawCars;
