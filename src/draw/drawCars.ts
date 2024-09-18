import GameState from '@interfaces/gameState';

import getOriginForSpace from '@util/getOriginForSpace';

import drawCar from './drawCar';

const primaryCarColor = '#ff0000';

const carColors = [
    '#FFEF9E',
    '#D2FF9E',
    '#9EFFA8',
    '#9EFFE5',
    '#9EDBFF',
    '#9E9EFF',
    '#DB9EFF',
    '#FF9EE5',
    '#FF9EA8',
    '#FFD09E'
];

function drawCars(ctx: CanvasRenderingContext2D, game: GameState): void {
    game.cars.forEach((car, i) => {
        const color = i === 0 ? primaryCarColor : carColors[i];
        if (i === game.heldCarIndex) {
            const carPosition = { ...game.heldCarPosition };
            if (car.animation === 'falling') {
                carPosition.x += car.animationFrame * 5;
            }
            drawCar(ctx, car, color, carPosition);
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
            drawCar(ctx, car, color, carPosition);
        }
    })
}

export default drawCars;
