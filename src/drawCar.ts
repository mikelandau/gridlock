import getOriginForSpace from './getOriginForSpace';
import Car from './types/car';
import Coordinates from './types/coordinates';

function drawCar(ctx: CanvasRenderingContext2D, car: Car, color: string, position: Coordinates) {
    const width = ctx.canvas.width;
    const height = ctx.canvas.height;

    const spaceWidth = width / 7;
    const spaceHeight = height / 7;

    let carWidth: number, carHeight: number;

    if (car.orientation === 'h') {
        carHeight = spaceHeight;
        carWidth = spaceWidth * car.size;
    } else {
        carHeight = spaceHeight * car.size;
        carWidth = spaceWidth;
    }

    ctx.fillStyle = color;
    ctx.fillRect(position.x, position.y, carWidth, carHeight);
}

export default drawCar;