import Car from '@interfaces/car';
import Coordinates from '@interfaces/coordinates';

function drawCar(ctx: CanvasRenderingContext2D, car: Car, color: string, position: Coordinates, highlight: boolean) {
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

    if (highlight) {
        carWidth += 10;
        carHeight += 10;
        position.x -= 5;
        position.y -= 5;
    }

    ctx.fillStyle = color;
    ctx.fillRect(position.x, position.y, carWidth, carHeight);
}

export default drawCar;