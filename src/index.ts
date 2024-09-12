import clearScreen from './clearScreen';
import drawBorder from './drawBorder';
import drawCars from './drawCars';
import drawGrid from './drawGrid';
import Car from './types/car';
import Coordinates from './types/coordinates';
import GameState from './types/gameState';

const canvas = document.getElementById('gridlockCanvas') as HTMLCanvasElement;
const ctx = canvas.getContext('2d') as CanvasRenderingContext2D;

const width = canvas.width;
const height = canvas.height;

let gameState: GameState;



async function init(): Promise<void> {
    gameState = await gameStateFromLevelFile('levels/level01.json');
}

async function gameStateFromLevelFile(path: string): Promise<GameState> {
    const levelResponse = await fetch(path);
    const levelJson = await levelResponse.json();
    const gameState = levelJson as GameState;
    return gameState;
}

function step(): void {
    clearScreen(ctx);

    drawBorder(ctx);
    drawGrid(ctx);

    drawCars(ctx, gameState.cars);

    window.requestAnimationFrame(step);
}

init().then(() => {
    window.requestAnimationFrame(step);
}).catch((e) => {
    console.error('initialization error');
    console.error(e);
});
