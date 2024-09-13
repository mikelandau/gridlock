import clearScreen from './clearScreen';
import drawBorder from './drawBorder';
import drawCars from './drawCars';
import drawGrid from './drawGrid';
import getCarAtMouseCoordinates from './getCarAtMouseCoordinates';
import getDragBoundaries from './getDragBoundaries';
import getNearestSpaceForCoordinates from './getNearestSpaceForCoordinates';
import getTargetHeldCarPosition from './getTargetHeldCarPosition';
import Car from './types/car';
import Coordinates from './types/coordinates';

const canvas = document.getElementById('gridlockCanvas') as HTMLCanvasElement;
const ctx = canvas.getContext('2d') as CanvasRenderingContext2D;

let cars: Car[];

let holdingCar = false;
let heldCarIndex = -1;

let mouseButtonPressed = false;
let clientMouseX = 0;
let clientMouseY = 0;

let holdOriginalCanvasMouseX = 0;
let holdOriginalCanvasMouseY = 0;

let dragBoundaries: DragBoundaries;

let currentLevel = 0;

async function init(): Promise<void> {
    await resetGame();
}

async function resetGame(): Promise<void> {
    let levelFile: string;
    switch(currentLevel) {
        case 0:
            levelFile = 'levels/level01.json';
            break;
        case 1:
            levelFile = 'levels/level11.json';
            break;
        case 2:
            levelFile = 'levels/level21.json';
            break;
        case 3:
            levelFile = 'levels/level31.json';
            break;
        default:
            levelFile = 'levels/level31.json';
    }
    cars = await carsfromLevelFile(levelFile);
    holdingCar = false;
    heldCarIndex = -1;
}

function getCanvasMousePosition(): Coordinates {
    const bounding = canvas.getBoundingClientRect();
    const x = Math.floor(clientMouseX - bounding.x);
    const y = Math.floor(clientMouseY - bounding.y);

    return { x, y };
}

async function carsfromLevelFile(path: string): Promise<Car[]> {
    const levelResponse = await fetch(path);
    const levelJson = await levelResponse.json();
    const cars = levelJson.cars as Car[];
    return cars;
}

function isLevelCompleted(ctx: CanvasRenderingContext2D, heldCar: Car, heldCarPosition: Coordinates) {
    const width = ctx.canvas.width;
    const spaceWidth = (width / 7);
    const carRightX = heldCarPosition.x + (spaceWidth * heldCar.size);

    const levelCompleted = carRightX > width;
    return levelCompleted;
}

function step(): void {
    const {x: canvasMouseX, y: canvasMouseY} = getCanvasMousePosition();

    if (!holdingCar && mouseButtonPressed) {
        holdingCar = true;
        heldCarIndex = getCarAtMouseCoordinates(ctx, cars, { x: canvasMouseX, y: canvasMouseY});
        holdOriginalCanvasMouseX = canvasMouseX;
        holdOriginalCanvasMouseY = canvasMouseY;
        if (heldCarIndex >= 0) {
            dragBoundaries = getDragBoundaries(ctx, cars[heldCarIndex], cars);
        }
    }
    else if (holdingCar && !mouseButtonPressed) {
        if (heldCarIndex >= 0) {
            const heldCarPosition = getHeldCarPosition(ctx, cars[heldCarIndex], canvasMouseX, canvasMouseY, holdOriginalCanvasMouseX, holdOriginalCanvasMouseY);
            const newSpaceCoords = getNearestSpaceForCoordinates(ctx, heldCarPosition);
            cars[heldCarIndex].x = newSpaceCoords.x;
            cars[heldCarIndex].y = newSpaceCoords.y;
        }
        holdingCar = false;
        heldCarIndex = -1;
    }

    const heldCarPosition = getHeldCarPosition(ctx, cars[heldCarIndex], canvasMouseX, canvasMouseY, holdOriginalCanvasMouseX, holdOriginalCanvasMouseY);

    if (heldCarIndex === 0 && isLevelCompleted(ctx, cars[heldCarIndex], heldCarPosition)) {
        if (currentLevel === 3) {
            alert('You\'re purdy smart there einstein');
        }
        currentLevel = Math.min(3, currentLevel + 1);
        resetGame().then(() => {
            window.requestAnimationFrame(step);
        })
        return;
    }

    clearScreen(ctx);

    drawBorder(ctx);
    drawGrid(ctx);

    drawCars(ctx, cars, heldCarIndex, heldCarPosition);

    window.requestAnimationFrame(step);
}



function getHeldCarPosition(ctx: CanvasRenderingContext2D, heldCar: Car, canvasMouseX: number, canvasMouseY: number, holdOriginalCanvasMouseX: number, holdOriginalCanvasMouseY: number) {
    const heldCarPosition: Coordinates = { x: 0, y: 0 };
    if (holdingCar && heldCarIndex >= 0) {
        const targetHeldCarPosition = getTargetHeldCarPosition(ctx, heldCar, canvasMouseX, canvasMouseY, holdOriginalCanvasMouseX, holdOriginalCanvasMouseY);

        heldCarPosition.x = Math.max(dragBoundaries.minX, Math.min(dragBoundaries.maxX, targetHeldCarPosition.x));
        heldCarPosition.y = Math.max(dragBoundaries.minY, Math.min(dragBoundaries.maxY, targetHeldCarPosition.y));
    }
    return heldCarPosition;
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
