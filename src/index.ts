import clearScreen from './clearScreen';
import drawBorder from './drawBorder';
import drawCars from './drawCars';
import drawGrid from './drawGrid';
import getCarAtMouseCoordinates from './getCarAtMouseCoordinates';
import getDragBoundaries from './getDragBoundaries';
import getNearestSpaceForCoordinates from './getNearestSpaceForCoordinates';
import getOriginForSpace from './getOriginForSpace';
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

async function init(): Promise<void> {
    cars = await carsfromLevelFile('levels/level01.json');
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

        //console.log(`minX=${dragBoundaries.minX} minY=${dragBoundaries.minY} maxX=${dragBoundaries.maxX} maxY=${dragBoundaries.maxY} canvasMouseX=${canvasMouseX} canvasMouseY=${canvasMouseY}`);
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
