import clearScreen from './clearScreen';
import drawBorder from './drawBorder';
import drawCars from './drawCars';
import drawGrid from './drawGrid';
import getCarAtMouseCoordinates from './getCarAtMouseCoordinates';
import getOriginForSpace from './getOriginForSpace';
import Car from './types/car';
import Coordinates from './types/coordinates';
import GameState from './types/gameState';

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

function isAnyCarInSpace(spaceX: number, spaceY: number, cars: Car[]) {
    console.log(`testing ${spaceX},${spaceY}`)
    for (const car of cars) {
        if (car.orientation == 'h') {
            if (car.y === spaceY &&
                spaceX >= car.x &&
                spaceX < car.x + car.size) {
                    console.log('true');
                    return true;
            }
        } else {
            if (car.x === spaceX &&
                spaceY >= car.y &&
                spaceY < car.y + car.size) {
                    console.log('true');
                    return true;
            }
        }
    }
    console.log('false');
    return false;
}


function getDragBoundaries(heldCar: Car, cars: Car[]) {
    if (heldCar.orientation === 'h') {
        let minSpaceX = heldCar.x;
        while (minSpaceX > 0 && !isAnyCarInSpace(minSpaceX - 1, heldCar.y, cars)) {
            minSpaceX -= 1; // don't use unary operators because javascript was designed by orangutans
        }
        
        let maxSpaceX = heldCar.x;
        while (maxSpaceX + heldCar.size < 6 && !isAnyCarInSpace(maxSpaceX + heldCar.size, heldCar.y, cars)) {
            maxSpaceX += 1;
        }
        console.log(`minSpaceX=${minSpaceX} maxSpaceX=${maxSpaceX}`);

        const minCoords = getOriginForSpace(ctx, minSpaceX, heldCar.y);
        const maxCoords = getOriginForSpace(ctx, maxSpaceX, heldCar.y);

        const dragBoundaries : DragBoundaries = {
            maxX: maxCoords.x,
            maxY: maxCoords.y,
            minX: minCoords.x,
            minY: minCoords.y
        }

        return dragBoundaries;
    } else {
        let minSpaceY = heldCar.y;
        while (minSpaceY > 0 && !isAnyCarInSpace(heldCar.x, minSpaceY - 1, cars)) {
            minSpaceY -= 1; 
        }
        
        let maxSpaceY = heldCar.y;
        while (maxSpaceY + heldCar.size < 6 && !isAnyCarInSpace(heldCar.x, maxSpaceY + heldCar.size, cars)) {
            maxSpaceY += 1;
        }
        console.log(`minSpaceY=${minSpaceY} maxSpaceY=${maxSpaceY}`);

        const minCoords = getOriginForSpace(ctx, heldCar.x, minSpaceY);
        const maxCoords = getOriginForSpace(ctx, heldCar.x, maxSpaceY);

        const dragBoundaries : DragBoundaries = {
            maxX: maxCoords.x,
            maxY: maxCoords.y,
            minX: minCoords.x,
            minY: minCoords.y
        }

        return dragBoundaries;
    }
}

function step(): void {
    const {x: canvasMouseX, y: canvasMouseY} = getCanvasMousePosition();

    if (!holdingCar && mouseButtonPressed) {
        holdingCar = true;
        heldCarIndex = getCarAtMouseCoordinates(ctx, cars, { x: canvasMouseX, y: canvasMouseY});
        holdOriginalCanvasMouseX = canvasMouseX;
        holdOriginalCanvasMouseY = canvasMouseY;
        console.log(`grabbed ${heldCarIndex}`);
        if (heldCarIndex >= 0) {
            dragBoundaries = getDragBoundaries(cars[heldCarIndex], cars);
        }
    }
    else if (holdingCar && !mouseButtonPressed) {
        holdingCar = false;
        console.log(`released ${heldCarIndex}`);
        heldCarIndex = -1;
    }

    const heldCarPosition: Coordinates = { x: 0, y: 0 }
    if (holdingCar && heldCarIndex >= 0) {
        const heldCar = cars[heldCarIndex];
        const heldCarOrigin = getOriginForSpace(ctx, heldCar.x, heldCar.y);
        const dragX = canvasMouseX - holdOriginalCanvasMouseX;
        const dragY = canvasMouseY - holdOriginalCanvasMouseY;
        const targetHeldCarPositionX = heldCarOrigin.x + dragX;
        const targetHeldCarPositionY = heldCarOrigin.y + dragY;
        
        console.log(`minX=${dragBoundaries.minX} minY=${dragBoundaries.minY} maxX=${dragBoundaries.maxX} maxY=${dragBoundaries.maxY} canvasMouseX=${canvasMouseX} canvasMouseY=${canvasMouseY}`)
        heldCarPosition.x = Math.max(dragBoundaries.minX, Math.min(dragBoundaries.maxX, targetHeldCarPositionX));
        heldCarPosition.y = Math.max(dragBoundaries.minY, Math.min(dragBoundaries.maxY, targetHeldCarPositionY));
    }

    clearScreen(ctx);

    drawBorder(ctx);
    drawGrid(ctx);

    drawCars(ctx, cars, heldCarIndex, heldCarPosition);

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
