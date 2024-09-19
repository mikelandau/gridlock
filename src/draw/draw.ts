import GameState from '@interfaces/gameState';

import clearScreen from './clearScreen';
import drawBorder from './drawBorder';
import drawGrid from './drawGrid';
import drawCars from './drawCars';
import drawHeldCar from './drawHeldCar';
import drawTitleScreenText from './drawTitleScreenText';

function draw(ctx: CanvasRenderingContext2D, game: GameState) {
    clearScreen(ctx);
    drawGrid(ctx);
    if (game.gamePhase !== 'title') {
        drawCars(ctx, game);
    }
    drawBorder(ctx);
    drawHeldCar(ctx, game);
    if (game.gamePhase === 'title') {
        drawTitleScreenText(ctx);
    }
}

export default draw;
