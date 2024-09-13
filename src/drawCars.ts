import drawCar from './drawCar';
import getOriginForSpace from './getOriginForSpace';
import Car from './types/car';
import Coordinates from './types/coordinates';

const primaryCarColor = '#ff0000';

const carColors = [
    '#FFEF9E',
    '#D2FF9E',
    '#9EFFA8',
    '#9EFFE5',
    '#9EDBFF',
    '#9E9EFF',
    '#DB9EFF',
    '#FF9EE5',
    '#FF9EA8',
    '#FFD09E'
];

function drawCars(ctx: CanvasRenderingContext2D, cars: Car[], heldCarIndex: number, heldCarPosition: Coordinates): void {
    cars.forEach((car, i) => {
        const color = i === 0 ? primaryCarColor : carColors[i];
        if (i === heldCarIndex) {
            drawCar(ctx, car, color, heldCarPosition);
        }
        else {
            drawCar(ctx, car, color, getOriginForSpace(ctx, car.x, car.y));
        }
    })
}

export default drawCars;
