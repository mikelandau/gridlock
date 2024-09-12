import clearScreen from './clearScreen';
import drawBorder from './drawBorder';
import drawCars from './drawCars';
import drawGrid from './drawGrid';
import getOriginForSpace from './getOriginForSpace';
import Car from './types/car';
import Coordinates from './types/coordinates';
import GameState from './types/gameState';

const canvas = document.getElementById('gridlockCanvas') as HTMLCanvasElement;
const ctx = canvas.getContext('2d') as CanvasRenderingContext2D;

let gameState: GameState;

let holdingCar = false;
let carHeldIndex = -1;

let mouseButtonPressed = false;
let clientMouseX = 0;
let clientMouseY = 0;

async function init(): Promise<void> {
    gameState = await gameStateFromLevelFile('levels/level01.json');
}

function getCanvasMousePosition(): Coordinates {
    const bounding = canvas.getBoundingClientRect();
    const x = Math.floor(clientMouseX - bounding.x);
    const y = Math.floor(clientMouseY - bounding.y);

    return { x, y };
}

async function gameStateFromLevelFile(path: string): Promise<GameState> {
    const levelResponse = await fetch(path);
    const levelJson = await levelResponse.json();
    const gameState = levelJson as GameState;
    return gameState;
}

function isMouseOverCar(car: Car, canvasMouseX: number, canvasMouseY: number): boolean {
    const width = ctx.canvas.width;
    const height = ctx.canvas.height;
    const spaceWidth = width / 7;
    const spaceHeight = height / 7;

    const {x: carX, y: carY} = getOriginForSpace(ctx, car.x, car.y);
    let carWidth: number, carHeight: number;
    if (car.orientation === 'h') {
        carWidth = car.size * spaceWidth;
        carHeight = spaceHeight;
    } else {
        carWidth = spaceWidth;
        carHeight = car.size * spaceHeight;
    }

    const mouseOverCar = 
        canvasMouseX >= carX && 
        canvasMouseX <= carX + carWidth &&
        canvasMouseY >= carY &&
        canvasMouseY <= carY + carHeight;

    return mouseOverCar;
}

function grabCar(canvasMouseX: number, canvasMouseY: number): number {
    for (let i = 0; i < gameState.cars.length; ++i) {
        if (isMouseOverCar(gameState.cars[i], canvasMouseX, canvasMouseY)) {
            return i;
        }
    }
    return -1;
}

function step(): void {
    const {x: canvasMouseX, y: canvasMouseY} = getCanvasMousePosition();

    if (!holdingCar && mouseButtonPressed) {
        holdingCar = true;
        carHeldIndex = grabCar(canvasMouseX, canvasMouseY);
        console.log(`grabbed ${carHeldIndex}`);
    }
    else if (holdingCar && !mouseButtonPressed) {
        holdingCar = false;
        console.log(`released ${carHeldIndex}`);
    }

    clearScreen(ctx);

    drawBorder(ctx);
    drawGrid(ctx);

    drawCars(ctx, gameState.cars);

    window.requestAnimationFrame(step);
}

function updateMouse(e: MouseEvent) {
    mouseButtonPressed = (e.buttons & 1) === 1;
    clientMouseX = e.clientX;
    clientMouseY = e.clientY;
}

document.addEventListener("mousedown", updateMouse);
document.addEventListener("mousemove", updateMouse);
document.addEventListener("mouseup", updateMouse);

init().then(() => {
    window.requestAnimationFrame(step);
}).catch((e) => {
    console.error('initialization error');
    console.error(e);
});
