import getOriginForSpace from './getOriginForSpace';
import Car from './types/car';
import Coordinates from './types/coordinates';

function isCoordinateOverCar(ctx: CanvasRenderingContext2D, car: Car, canvasMouseCoords: Coordinates): boolean {
    const { x: canvasMouseX, y: canvasMouseY } = canvasMouseCoords;
    
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

export default isCoordinateOverCar;
