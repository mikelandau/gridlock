import getOriginForSpace from './getOriginForSpace';
import Car from './types/car';

function drawCar(ctx: CanvasRenderingContext2D, car: Car, color: string) {
    const width = ctx.canvas.width;
    const height = ctx.canvas.height;

    const origin = getOriginForSpace(ctx, car.x, car.y);

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
    ctx.fillRect(origin.x, origin.y, carWidth, carHeight);
}

export default drawCar;