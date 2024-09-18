import GameState from '@interfaces/gameState';

import clearScreen from './clearScreen';
import drawBorder from './drawBorder';
import drawGrid from './drawGrid';
import drawCars from './drawCars';

function draw(ctx: CanvasRenderingContext2D, game: GameState) {
    clearScreen(ctx);
    drawGrid(ctx);
    drawCars(ctx, game);
    drawBorder(ctx);
}

export default draw;
